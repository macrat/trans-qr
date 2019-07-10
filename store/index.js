import Peer from 'skyway-js';


function makeRandomID() {
    const chars = (new TextDecoder).decode(Uint8Array.from({length: 0x7e-0x21+1}).map((_, i) => i+0x21));
    return [...crypto.getRandomValues(new Uint8Array(8))].map(x => chars[parseInt(x*chars.length/255)]).join('');
}


const peer = new Peer({
    key: process.env.SKYWAY_API_KEY,
});


export const plugins = [store => {
    peer.on('open', () => {
        store.commit('connected');

        store.state.cards.forEach(card => {
            console.log(card);
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

    open(state, {id}) {
        if (state.connected && peer.rooms[id] === undefined) {
            const room = peer.joinRoom(id);
            room.on('open', () => this.commit('opened', {id}));
            room.on('close', () => this.commit('closed', {id}));
            room.on('data', ({data}) => {
                switch (data.method) {
                case 'update':
                    this.commit('update-received', {id: id, text: data.text});
                    break;
                }
            });
            room.once('log', data => {
                for (let i=data.length-1; i>=0; i--) {
                    const {messageType, message, timestamp} = JSON.parse(data[i]);
                    if (messageType === "ROOM_DATA") {
                        this.commit('update-received', {id: id, text: message.data.text});
                        break;
                    }
                }
            });
            room.getLog();
        }

        if (state.cards.filter(x => x.id === id).length === 0) {
            state.cards.push({id: id, text: ''});
        }
    },

    opened() {
    },

    create() {
        this.commit('open', {id: makeRandomID()})
    },

    close(state, {id}) {
        peer.rooms[id].close();
        state.cards = state.cards.filter(x => x.id !== id);
    },

    closed() {
    },

    'update-received': function(state, {id, text}) {
        state.cards.filter(x => x.id === id).forEach(card => {
            card.text = text;
        });
    },

    update(state, {id, text}) {
        peer.rooms[id].send({
            method: 'update',
            text: text,
        });
        state.cards.filter(x => x.id === id).forEach(card => {
            card.text = text;
        });
    },
};
