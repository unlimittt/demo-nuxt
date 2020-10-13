<template>
  <b-row justify="center">
    <b-col cols="12" lg="9">
      <h1>Demo Nuxt Blog</h1>
      <blog-list :posts="posts" />
      <pagination
        route-name="blog-page"
        :page="page"
        :total-pages="totalPages"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  // watchQuery: ['page'],
  async asyncData({ $content, params, env }) {
    const page = +params.page || 1
    const skip = env.postsPerPage * (page - 1)
    const posts = await $content('posts')
      .without('body')
      .sortBy('createdAt', 'asc')
      .limit(env.postsPerPage)
      .skip(skip)
      .fetch()
    const allPosts = await $content('posts').only('slug').fetch()
    const totalPages = Math.ceil(allPosts.length / env.postsPerPage)

    const authorSlugs = posts.map((post) => post.author)
    const authors = await $content('authors')
      .where({
        slug: { $in: authorSlugs },
      })
      .fetch()
    posts.forEach((post) => {
      authors.forEach((author) => {
        if (post.author === author.slug) post.author = author
      })
    })

    const categorySlugs = posts.map((post) => post.category)
    const categories = await $content('categories')
      .where({
        slug: { $in: categorySlugs },
      })
      .fetch()
    posts.forEach((post) => {
      categories.forEach((category) => {
        if (post.category === category.slug) post.category = category
      })
    })

    return {
      page,
      totalPages,
      posts,
    }
  },
  head() {
    return {
      title: 'Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Demo blog written in nuxt.js',
        },
      ],
    }
  },
}
</script>
