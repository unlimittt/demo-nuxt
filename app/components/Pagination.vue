<template>
  <div class="pagination">
    <b-btn
      v-if="page > 1"
      :to="{ name: routeName, params: { ...routeParams, page: page - 1 } }"
      variant="primary"
      squared
    >
      Newer Posts
    </b-btn>
    <span v-else>&nbsp;</span>
    <b-btn
      v-if="page < totalPages"
      :to="{ name: routeName, params: { ...routeParams, page: page + 1 } }"
      variant="primary"
      squared
    >
      Older Posts
    </b-btn>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    routeName: { type: String, default: () => '' },
    routeParams: { type: Object, default: () => null },
    page: { type: Number, default: () => 1 },
    totalPages: { type: Number, default: () => 1 },
  },
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: space-between;
}
</style>
