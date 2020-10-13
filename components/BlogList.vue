<template>
  <div>
    <b-card v-for="post of posts" :key="post.slug" class="mb-2">
      <b-card-body>
        <b-card-title>
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: post.slug } }"
            class="text-gray-900"
          >
            {{ post.title }}
          </nuxt-link>
          <small>
            <nuxt-link
              :to="{
                name: 'blog-categories-slug',
                params: { slug: post.category.slug },
              }"
              class="text-muted"
            >
              {{ post.category.name }}
            </nuxt-link>
          </small>
        </b-card-title>

        <b-card-sub-title class="d-flex flex-column flex-lg-row">
          <div>
            by
            <nuxt-link
              :to="{
                name: 'blog-authors-slug',
                params: { slug: post.author.slug },
              }"
              class="text-muted"
            >
              {{ post.author.name }}
            </nuxt-link>
          </div>
          <div class="text-muted d-inline-flex">
            <span class="d-none d-lg-block">&nbsp;·&nbsp;</span>
            <span v-if="post.updatedAt <= post.createdAt">
              on {{ post.createdAt | formatDate }}
            </span>
            <span v-else>Updated on {{ post.updatedAt | formatDate }}</span>
            <span>&nbsp;· {{ post.readingTime.text }}</span>
          </div>
        </b-card-sub-title>
        <b-card-text>
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: post.slug } }"
            class="text-body"
          >
            {{ post.excerpt }}
          </nuxt-link>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
