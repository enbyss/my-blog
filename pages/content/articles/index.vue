<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Articles.</h1>
    <DocumentListings :documents="articles" />
  </div>
</template>

<script>
import DocumentListings from "@/components/DocumentListings.vue";

export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'slug', 'createdAt', 'readingTime', 'tags', 'category'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles
    }
  },
  components : {
    DocumentListings
  },
  head() {
    return {
      title: "Articles.",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "Some miscellaneous blog posts that I've written about any topic I want to.",
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
