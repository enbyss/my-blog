<template>
  <div class="document-link">
    <NuxtLink :to="`/content/${document.category}/${document.slug}`">
      <div>

        <h2 class="text-xl font-bold">{{document.title}}</h2>

        <h3 class="created-on">
          {{document.createdAt | formatDate}}

          <span class="float-right">
            <font-awesome-icon class="mr-1" :icon="['fas', 'clock']" />
            {{document.readingTime}}
          </span>
        </h3>

        <h3 class="italic">{{document.description}}</h3>


        <h3 class="tags">
          <span class="tag" v-for="(tag, index) in document.tags" :key="index">
            {{tag}}
          </span>
        </h3>

      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['document'],
  filters: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('en', options);
    }
  }
}
</script>

<style lang="scss" scoped>
.document-link {
  @apply rounded-2xl text-left transition duration-200;
  background: var(--bg-header);
  width: 300px;
  overflow: hidden;
  box-shadow: 0 0 20px var(--secondary-colour);

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
    background: var(--bg-header);
    color: white;
  }
  h3 {
    @apply px-3 py-1;
    background: rgba(255,255,255,0.3);
  }
}

.mode-dark {
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
  .document-link {
    width: 500px;
  }
}
</style>
