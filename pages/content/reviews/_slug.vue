<template>
  <div>
    <BaseDocument :document="review" />
    <ReviewScore :score="review.rating" :summary="review.ratingSummary" />
    <SendComment :slug="review.slug" class="mx-auto w-10/12 lg:w-7/12" />
  </div>
</template>

<script>
import BaseDocument from "@/components/BaseDocument.vue";
import ReviewScore from "@/components/ReviewScore.vue";
import SendComment from "@/components/SendComment.vue";

export default {
  async asyncData({ $content, params }) {
    const review = await $content('reviews', params.slug).fetch()

    return { review }
  },
  components : {
    BaseDocument,
    ReviewScore,
    SendComment
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
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
