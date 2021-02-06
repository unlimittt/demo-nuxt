<template lang="pug">
b-row
  b-col
    article.prose
      header
        h1 {{ post.title }}
          | &nbsp;
          small
            nuxt-link.text-muted(
              :to='{ name: "blog-categories-slug", params: { slug: post.category.slug } }'
            ) {{ post.category.name }}

        .mb-2.d-flex.justify-content-between.flex-column.flex-lg-row
          author(:author='post.author')
          p.text-dark.m-0.d-inline-flex.align-items-center
            span(v-if='post.updatedAt <= post.createdAt') {{ post.createdAt | formatDate }}
            span(v-else) Updated on {{ post.updatedAt | formatDate }}
            span &nbsp;· {{ post.readingTime.text }}

      x-picture(:src='post.image', :alt='post.alt || post.title')
      table-of-contents(v-if='post.toc.length > 0', :toc='post.toc')
      nuxt-content(:document='post')

      footer
        tags(:tags='post.tags')
        share.d-block(:url='url', :description='post.description')
        prev-next(:prev='prev', :next='next')
        disqus(:shortname='disqusShortName')
</template>

<script>
export default {
  async asyncData({ $content, params, env, route }) {
    const post = await $content('posts', params.slug).fetch()
    post.author = await $content('authors', post.author).fetch()
    post.category = await $content('categories', post.category).fetch()
    const tags = []
    for (const tag of post.tags) tags.push(await $content('tags', tag).fetch())
    post.tags = tags

    const [prev, next] = await $content('posts')
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    const disqusShortName = env.disqusShortName
    const url = env.hostname + route.path

    return {
      post,
      prev,
      next,
      disqusShortName,
      url,
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { name: 'keywords', content: this.post.keywords },
        {
          hid: 'description',
          name: 'description',
          content: this.post.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.post.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.description,
        },
      ],
    }
  },
}
</script>
