<template>
  <div>
    <BaseDocument :document="article" />
  </div>
</template>

<script>
import BaseDocument from "@/components/BaseDocument.vue";

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    const image = require('~/assets/content-images/' + article.metaimage);

    return { article, image }
  },
  components : {
    BaseDocument
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: "description",
          content: this.article.description,
        },
        {
          property: 'og:title',
          content: this.article.title,
        },
        {
          property: 'og:description',
          content: this.article.description,
        },
        {
          property: 'og:image',
          content: this.image
        },
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
