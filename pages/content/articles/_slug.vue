<template>
  <article class="my-10 flex flex-col justify-center article-content" :class="darkMode ? 'prose-dark' : ''">
    <h1 class="mx-auto w-10/12 lg:w-7/12 text-5xl font-bold">{{article.title}}</h1>
    <p class="mx-auto w-10/12 lg:w-7/12 text-lg font-normal"><span class="font-bold">Created on:</span> {{article.createdAt | formatDate}}</p>
    <p class="mx-auto w-10/12 lg:w-7/12 text-lg font-normal"><span class="font-bold">Updated on:</span> {{article.updatedAt | formatDate}}</p>
    <hr class="mx-auto w-10/12 lg:w-7/12 my-8 dark:border-blue-500 border-blue-800"/>
    <div class="mx-auto mb-12 w-10/12 lg:w-7/12">
      <nuxt-content class="prose-xl" :document="article" />
    </div>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  data() {
    return {
      darkMode: true
    }
  },
  mounted() {
    this.$root.$on('mode-change', (darkMode) => this.darkMode = darkMode);
  },
  filters: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('en', options);
    }
  }
}
</script>

<style lang="scss">
.article-content.prose-dark {
  h1, h2, h3, h4 {
    color: white;
    font-weight: bold;
  }
  p {
    @apply text-blue-100;
  }
  ul, li {
    @apply text-blue-300;
  }
  b, i, strong {
    @apply text-blue-500;
  }
  a {
    @apply text-blue-300 font-bold underline;
    transition: all .2s ease-in-out;

    code {
      @apply text-blue-300;
      transition: all .2s ease-in-out;

      &:hover {
        @apply text-purple-500;
      }
    }

    &:hover {
      @apply text-purple-500;
    }
  }
  code {
    @apply text-gray-500;
  }
  figcaption {
    @apply text-gray-500;
  }
  table {
    @apply mx-auto border-8 border-blue-300;

    tr td:first-child, th:first-child {
      @apply pl-10;
    }

    tr td:last-child, th:last-child{
      @apply pr-10;
    }

    th {
      @apply pt-3 border-b-4 border-blue-300 border-double;
    }

    thead {
      @apply text-blue-300 p-10;
    }

    tbody {
      @apply text-blue-200;
    }
  }
}
</style>
