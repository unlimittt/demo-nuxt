<template>
  <b-row justify="center">
    <b-col cols="12" lg="9">
      <h1>{{ author.name }}</h1>
      <img :src="author.image" :alt="author.name" />
      <p>{{ author.bio }}</p>
      <h3>Here are a list of articles by {{ author.name }}:</h3>
      <blog-list :posts="posts" />
      <pagination
        route-name="blog-authors-slug-page"
        :route-params="{ slug: author.slug }"
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
    const author = await $content('authors', params.slug).fetch()
    const posts = await $content('posts')
      .where({ author: params.slug })
      .without(['body'])
      .sortBy('createdAt', 'asc')
      .limit(env.postsPerPage)
      .skip(skip)
      .fetch()
    for (const post of posts) {
      post.author = author
      post.category = await $content('categories', post.category).fetch()
    }

    const allPosts = await $content('posts')
      .where({ author: params.slug })
      .only('slug')
      .fetch()
    const totalPages = Math.ceil(allPosts.length / env.postsPerPage)

    return {
      author,
      posts,
      page,
      totalPages,
    }
  },
  head() {
    return {
      title: this.author.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.author.bio,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.author.name },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.author.bio,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.author.name,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.author.bio,
        },
      ],
    }
  },
}
</script>
