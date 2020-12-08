<template>
  <document class="my-10 flex flex-col justify-center document-content" :class="darkMode ? 'prose-dark' : 'prose-light'">
    <h1 class="mx-auto w-10/12 lg:w-7/12 text-5xl font-bold italic">{{document.title}}</h1>
    <p class="mx-auto w-10/12 lg:w-7/12 text-xl mb-3 italic">{{document.description}}</p>

    <p class="mx-auto w-10/12 lg:w-7/12 text-lg font-normal"><span class="font-bold">Created on:</span> {{document.createdAt | formatDate}}</p>
    <p v-if="document.updatedAt !== document.createdAt" class="mx-auto w-10/12 lg:w-7/12 text-lg font-normal"><span class="font-bold">
      Updated on:</span> {{document.updatedAt | formatDate}}
    </p>

    <p class="mx-auto w-10/12 lg:w-7/12 text-lg font-normal mt-3">
      <font-awesome-icon class="mr-1" :icon="['fas', 'clock']" />
      {{document.readingTime}}
    </p>

    <hr class="mx-auto w-10/12 lg:w-7/12 my-8 dark:border-blue-500 border-blue-800"/>

    <div v-if="document.showtoc" class="flex md:flex-row flex-col items-center mx-auto w-10/12 lg:w-7/12">
      <h1 class="toc-label px-5 text-3xl z-20 rounded-xl mr-0 md:-mr-2 dark:border-blue-700 border-pink-700 border-8 w-auto">Table of Contents</h1>
      <ul class="toc-list dark:border-blue-500 border-pink-500 rounded-xl border-8 w-96 p-3 my-3">
        <li
          v-for="link of document.toc"
          :key="link.id"
          :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"
          class="text-lg"
        >
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ul>
    </div>

    <hr v-if="document.showtoc" class="mx-auto w-10/12 lg:w-7/12 my-8 dark:border-blue-500 border-blue-800"/>

    <div class="mx-auto mb-12 w-10/12 lg:w-7/12">
      <nuxt-content class="prose-xl" :document="document" />
    </div>
  </document>
</template>

<script>
export default {
  props: ['document'],
  computed: {
    darkMode() {
      return this.$store.state.darkmode;
    }
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
html {
  scroll-behavior: smooth;
}

.toc2 {

  a {
    color: theme("colors.blue.500") !important;

    &:hover {
      color: theme("colors.pink.500") !important;
    }
  }
}

.toc3 {
  margin-left: 20px;

  a {
    color: theme("colors.blue.600") !important;

    &:hover {
      color: theme("colors.pink.600") !important;
    }
  }
}

.toc-list {
  ul, li {
    list-style-type: none !important;
  }
}

.document-content.prose-dark {
  h1, h2, h3, h4 {
    color: white;
    font-weight: bold;
  }
  p {
    @apply text-blue-100;
  }
  ul, li {
    @apply text-blue-300;
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  .toc-list {
    box-shadow: 0 0 10px theme("colors.blue.500");
  }
  .toc-label {
    box-shadow: 0 0 10px theme("colors.blue.700");
  }
  b, i, strong, em {
    @apply text-orange-500;
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

.document-content.prose-light {
  h1, h2, h3, h4 {
    color: black;
    font-weight: bold;
  }
  p {
    @apply text-gray-800;
  }
  ul, li {
    @apply text-blue-700;
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  .toc-list {
    box-shadow: 0 0 10px theme("colors.pink.500");
  }
  .toc-label {
    box-shadow: 0 0 10px theme("colors.pink.700");
  }
  b, i, strong, em {
    @apply text-pink-600;
  }
  a {
    @apply text-blue-600 font-bold underline;
    transition: all .2s ease-in-out;

    code {
      @apply text-blue-600;
      transition: all .2s ease-in-out;

      &:hover {
        @apply text-purple-800;
      }
    }

    &:hover {
      @apply text-purple-800;
    }
  }
  code {
    @apply text-blue-600;
  }
  figcaption {
    @apply text-gray-600;
  }
  table {
    @apply mx-auto border-8 border-pink-700;

    tr td:first-child, th:first-child {
      @apply pl-10;
    }

    tr td:last-child, th:last-child{
      @apply pr-10;
    }

    th {
      @apply pt-3 border-b-4 border-pink-700 border-double;
    }

    thead {
      @apply text-pink-600 p-10;
    }

    tbody {
      @apply text-pink-500;
    }
  }
}
</style>
