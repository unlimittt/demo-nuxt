<template>
  <div>
    <b-form-input
      id="searchInput"
      v-model="searchQuery"
      size="sm"
      class="mr-sm-2"
      placeholder="Search"
      type="search"
      autocomplete="off"
      aria-label="Search through site content"
    >
    </b-form-input>
    <b-popover
      placement="bottom"
      target="searchInput"
      html
      triggers="focus"
      title="Search results:"
    >
      <ul v-if="posts.length" class="list">
        <li v-for="post of posts" :key="post.slug">
          <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug } }">
            {{ post.title }}
          </nuxt-link>
        </li>
      </ul>
    </b-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      posts: [],
      tooltip: 'No results',
    }
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.posts = []
        return
      }
      this.posts = await this.$content('posts')
        .limit(6)
        .search(searchQuery)
        .fetch()

      this.tooltip = this.posts.length < 1 ? 'No results' : 'Results:'
    },
  },
}
</script>

<style scoped>
.list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
