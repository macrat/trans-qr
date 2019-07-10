<style scoped>
main {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    background-color: #f8f8f8;
    min-height: 100vh;
}
main > * {
    margin: 8px;
    width: 250px;
    height: 500px;
}
#operation-card .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
}
.open-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    font-size: 36px;
    padding: 10px;
    margin: 2px;
    border-radius: 36px;
    color: #333;
}
a.open-button:focus {
    outline: none;
    box-shadow: 0 0 8px 3px #9999ee66;
}

.v-enter-active, .v-leave-active {
    transition: opacity .4s;
}
.v-enter, .v-leave-to {
    opacity: 0;
}
</style>

<template>
        <transition-group tag=main>
            <text-card v-for="card in $store.state.cards" :key=card.id :value=card></text-card>
            <b-card id=operation-card key=operation-card>
                <a href v-ripple class=open-button @click.prevent="$store.commit('create')"><i class="fas fa-qrcode"></i></a>
                <a href v-ripple class=open-button @click.prevent><i class="fas fa-camera"></i></a>
            </b-card>
        </transition-group>
</template>

<script>
import TextCard from '~/components/TextCard';


export default {
    components: {TextCard},
    created() {
        let cards = this.$route.query.card;
        if (typeof cards === 'string') {
            cards = [cards];
        }
        if (cards) {
            cards.forEach(id => this.$store.commit('open', {id}));
        }
        history.replaceState(null, null, location.origin + location.pathname);
    },
}
</script>
