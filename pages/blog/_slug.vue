<template>
  <b-row>
    <b-col cols="12" lg="9">
      <article class="prose sm:prose-sm lg:prose-lg xl:prose-xl">
        <header>
          <h1>
            {{ post.title }}
            <small>
              <nuxt-link
                class="text-muted"
                :to="{
                  name: 'blog-categories-slug',
                  params: { slug: post.category.slug },
                }"
              >
                {{ post.category.name }}
              </nuxt-link>
            </small>
          </h1>

          <div
            class="mb-2 d-flex justify-content-between flex-column flex-lg-row"
          >
            <author :author="post.author" />
            <p class="text-dark m-0 d-inline-flex align-items-center">
              <span v-if="post.updatedAt <= post.createdAt">
                {{ post.createdAt | formatDate }}
              </span>
              <span v-else> Updated on {{ post.updatedAt | formatDate }} </span>
              <span>&nbsp;· {{ post.readingTime.text }}</span>
            </p>
          </div>

          <x-picture :src="post.image" :alt="post.alt || post.title" />

          <table-of-contents v-if="post.toc.length > 0" :toc="post.toc" />
        </header>

        <nuxt-content :document="post"></nuxt-content>

        <footer>
          <tags :tags="post.tags" />

          <share
            class="d-block d-lg-none"
            :url="url"
            :description="post.description"
          />

          <prev-next :prev="prev" :next="next" />

          <disqus :shortname="disqusShortName" />
        </footer>
      </article>
    </b-col>

    <b-col cols="12" lg="3" class="d-none d-lg-block">
      <share class="sticky-top" :url="url" :description="post.description" />
    </b-col>
  </b-row>
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
