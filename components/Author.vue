<template>
  <nuxt-link
    :to="{ name: 'blog-authors-slug', params: { slug: author.slug } }"
    class="text-dark d-inline-flex align-items-center"
  >
    <img
      width="60"
      height="60"
      class="rounded-circle"
      :src="author.image"
      :alt="author.name"
    />
    <div class="ml-2">
      <div>{{ author.name }}</div>
      <div>{{ author.bio }}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
}
</script>
