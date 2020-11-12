<template>
  <BaseArticle :article="article" />
</template>

<script>
import BaseArticle from "@/components/BaseArticle.vue";

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  components : {
    BaseArticle
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: "description",
          content: this.article.description,
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
