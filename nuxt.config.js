const router = process.env.DEPLOY_ENV !== 'GH_PAGES' ? {} : {
	base: '/trans-qr/',
};

export default {
    head: {
        title: 'TransQR',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
		],
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
    router: router,
}
