<template>
  <a
    class="link"
    :href="responsiveImage.original"
    target="_blank"
    rel="noopener"
  >
    <div
      class="background-image"
      :style="{
        paddingTop: `${
          (responsiveImage.jpg.height / responsiveImage.jpg.width) * 100
        }%`,
        backgroundImage: `url('${responsiveImage.jpg.placeholder}')`,
      }"
    >
      <picture>
        <source
          :srcSet="responsiveImage.webp.srcSet"
          type="image/webp"
          sizes="(max-width: 390px) 360px, (max-width: 510px) 480px, (max-width: 750px) 720px, 840px"
        />
        <source
          :srcSet="responsiveImage.jpg.srcSet"
          type="image/jpeg"
          sizes="(max-width: 390px) 360px, (max-width: 510px) 480px, (max-width: 750px) 720px, 840px"
        />
        <img class="image" :src="responsiveImage.jpg.src" :alt="alt" />
      </picture>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    src: { type: String, default: () => '' },
    alt: { type: String, default: () => '' },
  },
  computed: {
    responsiveImage() {
      const filename = this.src.substring(7, this.src.length)
      return {
        original: require(`@/static/media/${filename}?{original: true}`),
        jpg: require(`@/static/media/${filename}?{sizes: [360, 480, 720, 840], placeholder: true}`),
        webp: require(`@/static/media/${filename}?{sizes: [360, 480, 720, 840], format: 'webp'}`),
      }
    },
  },
}
</script>

<style scoped>
.link {
  display: block;
}
.background-image {
  display: block;
  position: relative;
  bottom: 0;
  left: 0;
  background-size: cover;
  width: 100%;
}
.image {
  width: 100%;
  height: 100%;
  margin: 0;
  vertical-align: middle;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
