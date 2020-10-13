<template>
  <b-row justify="center">
    <b-col cols="12" lg="9">
      <h1>Category List</h1>
      <ul>
        <li v-for="category of categories" :key="category">
          <nuxt-link
            :to="{
              name: 'blog-categories-slug',
              params: { slug: category.slug },
            }"
          >
            <div>
              <h2>{{ category.name }}</h2>
              <p>{{ category.description }}</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const categories = await $content('categories')
      .only(['name', 'description', 'slug'])
      .sortBy('name', 'asc')
      .fetch()
    return { categories }
  },
}
</script>
