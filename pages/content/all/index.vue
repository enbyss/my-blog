<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Everything.</h1>
    <DocumentListings :documents="all" />
  </div>
</template>

<script>
import DocumentListings from "@/components/DocumentListings.vue";

export default {
  async asyncData({ $content, params }) {
    const all = await $content('', {deep: true})
      .only(['title', 'description', 'slug', 'createdAt', 'readingTime', 'tags', 'category'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      all
    }
  },
  components : {
    DocumentListings
  },
  head() {
    return {
      title: "Reviews.",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "Reviews about things that I'm generally interested in. Sometimes.",
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
