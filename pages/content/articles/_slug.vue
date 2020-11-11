<template>
  <article class="prose article-content" :class="darkMode ? 'prose-dark' : ''">
    <nuxt-content class="prose-xl mx-auto" :document="article" />
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
  }
}
</script>

<style lang="scss">
.article-content.prose-dark {
  h1, h2, h3, h4 {
      color: white;
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
    @apply text-blue-300;
    text-shadow: -1px 1px 0px theme('color.blue.500');
    transition: all .2s ease-in-out;

    &:hover {
      @apply text-purple-300;
    }
  }
  code {
    @apply text-gray-500;
  }
}
</style>
