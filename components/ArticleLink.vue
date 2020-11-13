<template>
  <div class="article-link">
    <NuxtLink :to="`/content/articles/${article.slug}`">
      <div>

        <h2 class="text-xl font-bold">{{article.title}}</h2>

        <h3 class="created-on">
          {{article.createdAt | formatDate}}

          <span class="float-right">
            <font-awesome-icon class="mr-1" :icon="['fas', 'clock']" />
            {{article.readingTime}}
          </span>
        </h3>
        
        <h3 class="italic">{{article.description}}</h3>


        <h3 class="tags">
          <span class="tag" v-for="(tag, index) in article.tags" :key="index">
            {{tag}}
          </span>
        </h3>

      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['article'],
  filters: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('en', options);
    }
  }
}
</script>

<style lang="scss" scoped>
.article-link {
  @apply rounded-2xl text-left shadow-xl border-4 border-pink-500 transition duration-200;
  background: linear-gradient(90deg, #ff6397, #8f63ff);
  width: 300px;
  overflow: hidden;

  &:hover {
    @apply border-pink-800 transform scale-110;
  }

  h2 {
    @apply px-3 py-1;
    background: rgba(255,255,255,0.5);
  }
  .created-on {
    background: rgba(255,255,255,0.4);
  }
  .tags {
    @apply py-2;
    background: rgba(255,255,255,0.5);
  }
  .tag {
    @apply py-1 px-2 m-1 rounded-xl;
    background: linear-gradient(90deg, #ff276f, #5c1cff);
    color: white;
  }
  h3 {
    @apply px-3 py-1;
    background: rgba(255,255,255,0.3);
  }
}

.mode-dark {
  .article-link {
    background: linear-gradient(90deg, #ff276f, #5c1cff);
  }

  h2 {
    @apply px-3 py-1;
    background: rgba(0,0,0,0.5);
  }
  .created-on {
    background: rgba(0,0,0,0.4);
  }
  .tags {
    background: rgba(0,0,0,0.5);
  }
  h3 {
    @apply px-3 py-1;
    background: rgba(0,0,0,0.3);
  }
}

@screen sm {
  .article-link {
    width: 500px;
  }
}
</style>
