<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Content.</h1>
    <p>
      Welcome to my humble blog. This page is currently empty, <b>particularly</b> because I don't have much of an idea for what to put on here.
    </p>
    <p>
      From the links above, a lot of them <b><i>work</i></b>, but their pages aren't fully working yet. Do forgive me, I am indeed trying to be a good host.
    </p>
    <p>
      I hope you like the way this page looks however. Someday I'll figure out what to put on here.
    </p>

    <ul>
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="`/content/articles/${article.slug}`">
          <div>
            <h2 class="text-xl font-bold">{{article.title}}</h2>
            <h3 class="italic">{{article.description}}</h3>
          </div>
        </NuxtLink>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles
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
