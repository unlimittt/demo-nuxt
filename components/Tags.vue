<template>
  <div class="d-flex justify-content-center flex-wrap">
    <div v-for="tag of tags" :key="tag.slug" class="m-1">
      <b-btn
        pill
        variant="outline-primary"
        :to="{ name: 'blog-tags-slug', params: { slug: tag.slug } }"
      >
        {{ tag.name }}
      </b-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: { type: Array, default: () => [] },
  },
}
</script>
