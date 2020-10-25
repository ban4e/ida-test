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
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
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
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    /*
     ** Build configuration
     */
    build: {
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
            )
        }
    },
}
