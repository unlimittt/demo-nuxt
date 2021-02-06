<template>
  <b-row justify="center">
    <b-col>
      <h1>About Us</h1>
      <b-card style="max-width: 540px">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img src="/photo.jpg" alt="Ivan Gaidarov" />
          </b-col>
          <b-col md="8">
            <b-card-body>
              <b-card-title>Ivan Gaidarov</b-card-title>
              <b-card-text>Software Engineer</b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  head() {
    return { title: 'About' }
  },
}
</script>
