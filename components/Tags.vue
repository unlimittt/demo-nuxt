<template>
  <ul class="list">
    <li v-for="tag of tags" :key="tag.slug" class="mx-2">
      <b-btn
        pill
        variant="outline-primary"
        :to="{ name: 'blog-tags-slug', params: { slug: tag.slug } }"
      >
        {{ tag.name }}
      </b-btn>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tags: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.list {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}
</style>
