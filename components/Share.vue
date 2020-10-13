<template>
  <div>
    <facebook-button
      class="share-button--circle"
      :url="url"
      :description="description"
      btn-text=""
    />
    <twitter-button
      class="share-button--circle"
      :url="url"
      :description="description"
      btn-text=""
    />
    <pinterest-button
      class="share-button--circle"
      :url="url"
      :description="description"
      btn-text=""
    />
  </div>
</template>

<script>
export default {
  props: {
    url: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
  },
}
</script>
