<style scoped>
.header {
    display: flex;
    align-items: flex-start;
    margin: 0 4px;
}
.qrcode {
    user-select: none;
}
.button-list {
    display: flex;
    flex: 1 1;
    justify-content: flex-end;
}
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    margin-top: -6px;

    width: 20px;
    height: 20px;
	font-size: 24px;
    border-radius: 100%;

    padding: 12px;
    cursor: pointer;
}
.button i {
    font-size: 24px;
    color: #333;
    transform: rotateX(180deg);
}

textarea {
    flex: 1 1;
    background-color: transparent;
    resize: none;

	margin-top: 10px;
    padding-top: 10px;
    border: 0;
    border-top: 1px solid #ccc;
	font-size: 120%;
}
textarea:focus {
    outline: none;
}
.simple-card:focus-within {
    box-shadow: 0 0 8px 3px #9999ee33;
}
</style>

<template>
    <simple-card>
        <div class=header>
            <a :href=url tabindex=-1><qr-code class=qrcode :value=url :options=qrOptions tag=img /></a>
            <div class=button-list>
                <div v-ripple class=button><i class="fas fa-code-branch"></i></div>
                <div v-ripple class=button><i class="fas fa-expand"></i></div>
                <div v-ripple class=button @click="$store.commit('close', {secret: value.secret})"><i class="fas fa-times"></i></div>
            </div>
        </div>
        <textarea ref=text :value=value.text @input="$store.commit('update', {secret: value.secret, text: $event.target.value})"></textarea>
    </simple-card>
</template>

<script>
import QrCode from '@chenfengyuan/vue-qrcode';

import SimpleCard from '~/components/SimpleCard';


export default {
    props: ['value'],
    components: {QrCode, SimpleCard},
    computed: {
        qrOptions: () => ({
            width: 60,
            height: 60,
            margin: 0,
            color: {
                light: '#ffffff00',
                dark: '#000000ff',
            },
        }),
        url() {
            return `${location.origin}${location.pathname}?key=${this.value.secret.key}`;
        },
    },
    mounted() {
        this.$refs.text.focus();
    },
}
</script>
