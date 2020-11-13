<template>
  <BaseDocument :document="review" />
</template>

<script>
import BaseDocument from "@/components/BaseDocument.vue";

export default {
  async asyncData({ $content, params }) {
    const review = await $content('reviews', params.slug).fetch()

    return { review }
  },
  components : {
    BaseDocument
  },
  head() {
    return {
      title: this.review.title,
      meta: [
        {
          hid: 'description',
          name: "description",
          content: this.review.description,
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
