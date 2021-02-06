import readingTime from 'reading-time'

let posts = []
const hostname =
  process.NODE_ENV === 'production'
    ? 'https://https://festive-newton-e9a77c.netlify.app'
    : 'http://localhost:3000'

function constructFeedItem(post, dir, hostname) {
  const url = `${hostname}/${dir}/${post.slug}`
  return {
    title: post.title,
    id: url,
    link: url,
    description: post.description,
    content: post.bodyPlainText,
  }
}

async function createFeed(feed, args) {
  const [filePath, ext] = args
  feed.options = {
    title: 'My Blog',
    description: 'Blog Stuff!',
    link: `${hostname}/feed.${ext}`,
  }
  const { $content } = require('@nuxt/content')
  if (posts === null || posts.length === 0)
    posts = await $content(filePath).fetch()

  for (const post of posts) {
    const feedItem = await constructFeedItem(post, filePath, hostname)
    feed.addItem(feedItem)
  }
  return feed
}

async function createSitemapRoutes() {
  const routes = []
  const { $content } = require('@nuxt/content')
  if (posts === null || posts.length === 0)
    posts = await $content('posts').fetch()
  for (const post of posts) {
    routes.push(`blog/${post.slug}`)
    if (post.tags) for (const tag of post.tags) routes.push(`blog/tags/${tag}`)
  }

  const authors = await $content('authors').fetch()
  for (const author of authors) routes.push(`blog/authors/${author.slug}`)

  const categories = await $content('categories').fetch()
  for (const category of categories)
    routes.push(`blog/categories/${category.slug}`)

  return routes
}

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  env: {
    hostname,
    disqusShortName: 'localhost-3000-sq8ls0sroi',
    postsPerPage: 3,
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugplugins
   */
  plugins: ['@/plugins/mixins/index.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    '~/components',
    'vue-disqus/src/Disqus.vue',
    'vue-share-buttons/src/components/TwitterButton.vue',
    'vue-share-buttons/src/components/FacebookButton.vue',
    'vue-share-buttons/src/components/PinterestButton.vue',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@aceforth/nuxt-optimized-images',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/feed',
    '@nuxt/content',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics',
    '@nuxtjs/robots',
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      remarkPlugins: [],
    },
    nestedProperties: [],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  telemetry: false,
  hooks: {
    'content:file:beforeInsert': (document, database) => {
      if (document.extension === '.md') {
        document.bodyPlainText = document.text
        if (document.dir === '/posts')
          document.readingTime = readingTime(document.text)
      }
    },
  },
  loading: {
    // color: '#ffffff',
  },
  optimizedImages: {
    // optimizeImagesInDev: true,
    mozjpeg: {
      quality: 70,
    },
    webp: {
      preset: 'default',
      quality: 75,
    },
  },
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: false,
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'blog-page',
        path: '/blog/page/:page',
        component: resolve(__dirname, 'pages/blog/index.vue'),
      })
      routes.push({
        name: 'blog-authors-slug-page',
        path: '/blog/authors/:slug/page/:page',
        component: resolve(__dirname, 'pages/blog/authors/_slug.vue'),
      })
      routes.push({
        name: 'blog-categories-slug-page',
        path: '/blog/categories/:slug/page/:page',
        component: resolve(__dirname, 'pages/blog/categories/_slug.vue'),
      })
      routes.push({
        name: 'blog-tags-slug-page',
        path: '/blog/tags/:slug/page/:page',
        component: resolve(__dirname, 'pages/blog/tags/_slug.vue'),
      })
    },
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      'LayoutPlugin',
      'FormPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
      'FormTextareaPlugin',
      'ButtonPlugin',
      'NavbarPlugin',
      'CardPlugin',
      'PopoverPlugin',
    ],
    directivePlugins: [],
  },
  styleResources: {
    scss: ['~/assets/scss/main.scss'],
  },
  pwa: {
    meta: {
      title: 'Demo Nuxt',
      author: '@unlimittt',
      description: 'Demo Nuxt.js site',
      ogHost: hostname,
      keywords: ['nuxt.js', 'vue.js'],
    },
    manifest: {
      start_url: '/',
      name: 'Demo Nuxt.js site',
      short_name: 'Demo Nuxt.js',
      description: 'Demo Nuxt.js site',
      background_color: '#FFF',
      theme_color: '#007bff',
      display: `standalone`,
      crossOrigin: `use-credentials`,
      cache_busting_mode: 'none',
    },
  },
  feed: [
    {
      path: '/feed.xml',
      create: createFeed,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ['posts', 'xml'],
    },
  ],
  sitemap: {
    hostname,
    gzip: true,
    routes: createSitemapRoutes,
    filter: ({ routes }) => {
      return routes.map((route) => {
        route.url = `${route.url}/`
        return route
      })
    },
  },
  robots: [
    {
      UserAgent: '*',
      Disallow: () => '/about',
      Host: hostname,
      Sitemap: `${hostname}/sitemap.xml`,
    },
  ],
  googleAnalytics: {
    id: 'UA-180190958-1',
  },
}
