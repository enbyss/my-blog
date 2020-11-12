<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Content.</h1>
    <ArticleListings :articles="articles" />
  </div>
</template>

<script>
import ArticleListings from "@/components/ArticleListings.vue";

export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'slug', 'createdAt', 'readingTime', 'tags'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles
    }
  },
  components : {
    ArticleListings
  },
  head() {
    return {
      title: "Content.",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "This is where I put all the stuff I've written. Pretty barren right now.",
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
p {
  @apply text-2xl w-10/12 mx-auto my-5;
}

@screen lg {
  p {
    @apply w-7/12;
  }
}
</style>
