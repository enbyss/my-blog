<template>
  <div>
    <BaseDocument :document="review" />
    <ReviewScore :score="review.rating" :summary="review.ratingSummary" />
  </div>
</template>

<script>
import BaseDocument from "@/components/BaseDocument.vue";
import ReviewScore from "@/components/ReviewScore.vue";

export default {
  async asyncData({ $content, params }) {
    const review = await $content('reviews', params.slug).fetch();
    const image = require('~/assets/content-images/' + review.metaimage);

    return { review, image }
  },
  components : {
    BaseDocument,
    ReviewScore,
  },
  head() {
    return {
      title: this.review.title,
      meta: [
        {
          hid: 'description',
          name: "description",
          content: this.review.description,
        },
        {
          property: 'og:title',
          content: this.review.title,
        },
        {
          property: 'og:description',
          content: this.review.description,
        },
        {
          property: 'og:image',
          content: this.image
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          property: 'twitter:site',
          content: '@enbyss'
        },
        {
          property: 'twitter:creator',
          content: '@enbyss'
        },
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
