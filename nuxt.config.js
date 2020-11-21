const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const svgRuntimeGenerator = require.resolve('./utils/svgGenerator.js');

export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: 'Тестовое задание',
        meta: [
            {charset: 'utf-8'},
            {title: 'Тестовое задание'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        '@/assets/scss/app.scss'
    ],
    styleResources: {
        scss: [
            '@/assets/scss/globals/variables.scss',
            '@/assets/scss/globals/mixins.scss',
        ]
    },
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        { src: '@/plugins/modalize.js', mode: 'client' },
        { src: '@/plugins/lazyload.js', mode: 'client' },
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        '@nuxtjs/universal-storage',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},

    router: {
        linkActiveClass: 'is-active-link',
        linkExactActiveClass: 'is-exactly-active-link',
    },

    storage: {
        vuex: {
            namespace: 'storage'
        },
        cookie: {
            prefix: '',
            options: {
                path: '/'
            }
        },
        localStorage: {
            prefix: ''
        },
        ignoreExceptions: false,
    },

    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    /*
     ** Build configuration
     */
    build: {
        loaders: {
            scss: {
                sassOptions: {
                    precision: 9
                }
            }
        },
        extend (config, ctx) {
            // Excludes /assets/svg from url-loader
            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
            svgRule.test = /\.(png|jpe?g|gif|webp)$/;

            config.module.rules.push(
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                spriteFilename: ctx.isDev ? 'svg-sprite.svg' : 'svg-sprite.[contenthash].svg',
                                runtimeGenerator: svgRuntimeGenerator,
                            }
                        },
                        {
                            loader: 'svgo-loader',
                        },
                    ]
                }
            );
            config.plugins.push(
                new SpriteLoaderPlugin({
                    plainSprite: true,
                    spriteAttrs: {
                        id: 'svgSprite',
                    },
                }),
            );
        }
    },
}
