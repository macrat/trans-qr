<style scoped>
.card-body {
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
}

.header {
    display: flex;
    align-items: flex-start;
    margin: 6px 4px 10px;
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
    width: 36px;
    height: 36px;
    font-size: 24px;
    padding: 12px;
    margin-left: 2px;
    margin-top: -6px;
    border-radius: 48px;
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
    border: 0;
    resize: none;

    padding-top: 10px;
    border-top: 1px solid #ccc;
}
textarea:focus {
    outline: none;
}
.card:focus-within {
    box-shadow: 0 0 8px 3px #9999ee33;
}
</style>

<template>
    <b-card>
        <div class=header>
            <a :href=url tabindex=-1><qr-code class=qrcode :value=url :options=qrOptions tag=img /></a>
            <div class=button-list>
                <div v-ripple class=button><i class="fas fa-code-branch"></i></div>
                <div v-ripple class=button><i class="fas fa-expand"></i></div>
                <div v-ripple class=button @click="$store.commit('close', {secret: value.secret})"><i class="fas fa-times"></i></div>
            </div>
        </div>
        <textarea ref=text :value=value.text @input="$store.commit('update', {secret: value.secret, text: $event.target.value})"></textarea>
    </b-card>
</template>

<script>
import QrCode from '@chenfengyuan/vue-qrcode';


export default {
    props: ['value'],
    components: {QrCode},
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
