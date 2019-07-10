import Peer from 'skyway-js';
import AES from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import WordArray from 'crypto-js/lib-typedarrays';
import sha256 from 'crypto-js/sha256';
import utf8 from 'crypto-js/enc-utf8';


function makeSecret(fromKey=null) {
	const key = fromKey !== null ? fromKey : (new TextDecoder).decode(crypto.getRandomValues(new Uint8Array(8)).map(x => parseInt(x)*(0x7e-0x21)/255 + 0x21)).replace(/&/g, '~');
	const cryptKey = sha256(key);
	const roomID = sha256(cryptKey);

	return {
		key: key,
		cryptKey: cryptKey.toString(),
		roomID: roomID.toString()
	};
}


function encrypt(secret, data) {
	return AES.encrypt(JSON.stringify(data), secret.cryptKey).toString();
}


function decrypt(secret, data) {
	return JSON.parse(AES.decrypt(data, secret.cryptKey).toString(utf8));
}


const peer = new Peer({
    key: process.env.SKYWAY_API_KEY,
});


export const plugins = [store => {
    peer.on('open', () => {
        store.commit('connected');

        store.state.cards.forEach(card => {
            store.commit('open', card);
        });
    });
    peer.on('disconnected', () => {
        store.commit('disconnected');
    });
}];


export const state = () => ({
    connected: false,
    cards: [],
})


export const mutations = {
    connected(state) {
        state.connected = true;
    },

    disconnected(state) {
        state.connected = false;
    },

    open(state, {secret: {key}}) {
		const secret = makeSecret(key);

        if (state.connected && peer.rooms[secret.roomID] === undefined) {
            const room = peer.joinRoom(secret.roomID);
            room.on('open', () => this.commit('opened', {secret}));
            room.on('close', () => this.commit('closed', {secret}));
            room.on('data', ({data: raw}) => {
				const data = decrypt(secret, raw);

                switch (data.method) {
                case 'update':
                    this.commit('update-received', {secret: secret, text: data.text});
                    break;
                }
            });
            room.once('log', data => {
                for (let i=data.length-1; i>0; i--) {
                    const {messageType, message, timestamp} = JSON.parse(data[i]);

                    if (messageType !== "ROOM_DATA") {
						continue;
					}

					const dec = decrypt(secret, message.data);
					if (dec.method === 'update') {
						this.commit('update-received', {secret: secret, text: dec.text});
						break;
					}
                }
            });
            room.getLog();
        }

        if (state.cards.filter(x => x.secret.key === secret.key).length === 0) {
            state.cards.push({secret: secret, text: ''});
        }
    },

    opened() {
    },

    create() {
        this.commit('open', {secret: makeSecret()})
    },

    close(state, {secret}) {
        peer.rooms[secret.roomID].close();
        state.cards = state.cards.filter(x => x.secret.key !== secret.key);
    },

    closed() {
    },

    'update-received': function(state, {secret, text}) {
        state.cards.filter(x => x.secret.key === secret.key).forEach(card => {
            card.text = text;
        });
    },

    update(state, {secret, text}) {
        peer.rooms[secret.roomID].send(encrypt(secret, {
            method: 'update',
            text: text,
        }));
        state.cards.filter(x => x.secret.key === secret.key).forEach(card => {
            card.text = text;
        });
    },
};
