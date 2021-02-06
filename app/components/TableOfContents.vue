<template>
  <nav>
    <ul class="m-0 p-1" style="list-style-position: inside">
      <li
        v-for="link of toc"
        :key="link.id"
        :class="{
          'py-2': link.depth === 2,
          'ml-2 pb-2': link.depth === 3,
        }"
      >
        <nuxt-link :to="`#${link.id}`">{{ link.text }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    toc: { type: Array, default: () => [] },
  },
}
</script>
