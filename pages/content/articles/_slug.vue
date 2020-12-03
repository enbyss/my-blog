<template>
  <BaseDocument :document="article" />
</template>

<script>
import BaseDocument from "@/components/BaseDocument.vue";

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
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
          content: this.review.title,
        },
        {
          property: 'og:description',
          content: this.review.description,
        },
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
