module.exports = {
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ],
  router: {
    // nuxt-link 高亮的类名，精确匹配
    linkExactActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清空路由
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              name: 'home',
              path: '',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              name: 'login',
              path: '/login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              name: 'register',
              path: '/register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              name: 'profile',
              path: '/profile/:username',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              name: 'settings',
              path: '/settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              name: 'editor',
              path: '/editor/:slug?',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              name: 'article',
              path: '/article/:slug',
              component: resolve(__dirname, 'pages/article/')
            },
          ]
        }
      ])
    }
  },
  server: {
    // 用于生产模式部署
    // localhost 时，支持本地访问、局域网访问
    // 0.0.0.0 外网访问，监听所有网卡 
    host: '0.0.0.0',
    port: 3000
  }
}