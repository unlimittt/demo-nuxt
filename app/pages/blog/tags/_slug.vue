<template>
  <b-row justify="center">
    <b-col cols="12" lg="9">
      <h1>#{{ tag.name }}</h1>
      <blog-list :posts="posts" />
      <pagination
        route-name="blog-tags-slug-page"
        :route-params="{ slug: tag.slug }"
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
    const tag = await $content('tags', params.slug).fetch()
    const posts = await $content('posts')
      .where({
        tags: { $contains: tag.slug },
      })
      .without('body')
      .sortBy('createdAt', 'asc')
      .limit(env.postsPerPage)
      .skip(skip)
      .fetch()
    for (const post of posts) {
      post.author = await $content('authors', post.author).fetch()
      post.category = await $content('categories', post.category).fetch()
    }

    const allPosts = await $content('posts')
      .where({
        tags: { $contains: tag.slug },
      })
      .only('slug')
      .fetch()
    const totalPages = Math.ceil(allPosts.length / env.postsPerPage)

    return {
      tag,
      posts,
      page,
      totalPages,
    }
  },
  head() {
    return {
      title: `#${this.tag.name}`,
    }
  },
}
</script>
