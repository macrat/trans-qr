import Peer from 'skyway-js';
import AES from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import WordArray from 'crypto-js/lib-typedarrays';
import sha256 from 'crypto-js/sha256';
import utf8 from 'crypto-js/enc-utf8';


class Secret {
	constructor(key=null) {
		if (key) {
			this.key = key;
			this.rawKey = WordArray.init(Base64.parse(this.key));
		} else {
			this.rawKey = WordArray.random(8);
			this.key = Base64.stringify(this.rawKey);
		}
		this.cryptKey = sha256(this.rawKey).toString();
		this.roomID = sha256(this.cryptKey).toString();
	}

	encrypt(data) {
		return AES.encrypt(JSON.stringify(data), this.cryptKey).toString();
	}

	decrypt(data) {
		return JSON.parse(AES.decrypt(data, this.cryptKey).toString(utf8));
	}
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

    open(state, {secret}) {
		secret = new Secret(secret.key);

        if (state.connected && peer.rooms[secret.roomID] === undefined) {
            const room = peer.joinRoom(secret.roomID);
            room.on('open', () => this.commit('opened', {secret}));
            room.on('close', () => this.commit('closed', {secret}));
            room.on('data', ({data: raw}) => {
				const data = secret.decrypt(raw);

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

					const dec = secret.decrypt(message.data);
					if (dec.method === 'update') {
						this.commit('update-received', {secret: secret, text: dec.text});
						break;
					}
                }
            });
            room.getLog();
        }

        if (state.cards.filter(x => x.secret.roomID === secret.roomID).length === 0) {
            state.cards.push({secret: secret, text: ''});
        }
    },

    opened() {
    },

    create() {
        this.commit('open', {secret: new Secret()})
    },

    close(state, {secret}) {
        peer.rooms[secret.roomID].close();
        state.cards = state.cards.filter(x => x.secret.roomID !== secret.roomID);
    },

    closed() {
    },

    'update-received': function(state, {secret, text}) {
        state.cards.filter(x => x.secret.roomID === secret.roomID).forEach(card => {
            card.text = text;
        });
    },

    update(state, {secret, text}) {
        peer.rooms[secret.roomID].send(secret.encrypt({
            method: 'update',
            text: text,
        }));
        state.cards.filter(x => x.secret.roomID === secret.roomID).forEach(card => {
            card.text = text;
        });
    },
};
