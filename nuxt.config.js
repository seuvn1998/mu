let port = 8080;
let host = 'elemonft.io';
module.exports = {
  dev:true,
  ssr:false,
  target: 'static',
  server: {
    port, // default: 3000
    host // default: localhost
  },
  sms:{
    // Token send sms 

    token:'n9v2n9qw9nfkdgnalvnv34e12rh2rh807hr8bd08fwbydosfb834bf7afb8b3487h7hh',
  },
  crypt:{
    // Use encrypt and decrypt password user
    //`index` is integer and index < 100

    key:'ibsd83ibu20isdbe043a89sdhf7wfh79feksdfhdu2erh9221ffb389fn920cdsn',
    index:43
  },
  axios:{
    baseURL:'http://'+host+':'+port
  },
  limit_log:10,
  router: {
    middleware: ['guest']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/user/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/account/logout', method: 'post' },
          user: { url: 'http://'+host+':'+port+'/api/account/info', method: 'get',propertyName:'id'}
        },
        tokenRequired: true,
        tokenType: ''
      // autoFetchUser: true
    }
  },





},
head: {
  title: 'MU Boxs',
  meta: [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { hid: 'description', name: 'description', content: 'Nuxt.js project' }
  ],
  link: [
  //{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
  ]
},
  /*
   ** Customize the progress-bar color
   */
   loading: false,
   srcDir: 'client/',
   css: [

   'element-ui/lib/theme-chalk/index.css',
   
   ],
  /*
  ** Build configuration
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  plugins: [
  '@/plugins/element-ui',
   '@/plugins/dark',
   '@/plugins/excel',
   '@/plugins/vue-metamask'

  ],
  
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
};
