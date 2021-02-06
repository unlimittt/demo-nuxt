<template>
  <b-row justify="center">
    <b-col>
      <h1>{{ category.name }}</h1>
      <blog-list :posts="posts" />
      <pagination
        route-name="blog-categories-slug-page"
        :route-params="{ slug: category.slug }"
        :page="page"
        :total-pages="totalPages"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  async asyncData({ $content, params, env }) {
    const page = +params.page || 1
    const skip = env.postsPerPage * (page - 1)
    const category = await $content('categories', params.slug).fetch()
    const posts = await $content('posts')
      .where({ category: params.slug })
      .without(['body'])
      .sortBy('createdAt', 'asc')
      .limit(env.postsPerPage)
      .skip(skip)
      .fetch()
    for (const post of posts) {
      post.category = category
      post.author = await $content('authors', post.author).fetch()
    }

    const allPosts = await $content('posts')
      .where({ category: params.slug })
      .only('slug')
      .fetch()
    const totalPages = Math.ceil(allPosts.length / env.postsPerPage)

    return {
      category,
      posts,
      page,
      totalPages,
    }
  },
  head() {
    return {
      title: this.category.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.category.name },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.category.description,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.category.name,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.category.description,
        },
      ],
    }
  },
}
</script>
