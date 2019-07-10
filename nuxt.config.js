export default {
    head: {
        link: [
            {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css'},
        ],
    },
    plugins: [
        '~/plugins/ripple-directive',
    ],
    modules: [
        '@nuxtjs/dotenv',
    ],
}
