export default {
  /*
   ** Headers of the page
   */
  head: {
    title: '一石云池 - Dashboard' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  serverMiddleware: [
    '~/server/app.js'
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFED8D' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/base.css',
    '~/assets/css/animate.min.css',
    '~/assets/css/element-reset.css',
    '~/static/font-awesome/css/font-awesome.min.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/element-ui.js',
    {src: '~/plugins/echarts.js', ssr: false},
    {src: '~/plugins/vue-video-player.js', ssr: false},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
   ** Nuxt.js proxy
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://[::1]:3000',
      changeOrigin: true
    }
  },
  /*
   ** 不允许使用该功能 (未使用的移除未使用的css样式)
   */
  purgeCSS: {
    enabled: false
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        ["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]
      ]
    },
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, { ctx, isClient }) {
      if (isClient) {
        config.performance = {
          hints: false
        }
      }
    }
  },
  watch: ['~/server']
}
