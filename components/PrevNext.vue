<template>
  <div class="prevNext">
    <nuxt-link
      v-if="prev"
      :to="{ name: `blog-slug`, params: { slug: prev.slug } }"
      class="text-primary font-bold hover:underline"
    >
      ← {{ prev.title }}
    </nuxt-link>
    <span v-else>&nbsp;</span>
    <nuxt-link
      v-if="next"
      :to="{ name: `blog-slug`, params: { slug: next.slug } }"
      class="font-bold hover:underline"
    >
      {{ next.title }} →
    </nuxt-link>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style>
.prevNext {
  display: flex;
  justify-content: space-between;
}
</style>
