<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Pick a category.</h1>

    <ul class="w-full mx-auto text-center">
      <li class="category-banner-container" :class="category.classname" v-for="(category, index) of categories" :key="index">
        <NuxtLink class="category-banner" :to="category.link">
          <h1>{{category.name}}</h1>
          <h2>{{category.description}}</h2>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import DocumentListings from "@/components/DocumentListings.vue";

export default {
  data() {
    return {
      categories: [
        {
          name: 'Articles',
          description: 'Discussing topics that I just want to talk about. Also includes just miscellaneous pages.',
          link: '/content/articles',
          classname: 'article-banner'
        },
        {
          name: 'Reviews',
          description: `Certain singular things that I just want to look into and give my feedback about.`,
          link: '/content/reviews',
          classname: 'review-banner'
        },
        {
          name: 'Everything',
          description: `Every single document on the site, of all categories.`,
          link: '/content/all',
          classname: 'all-banner'
        },
      ]
    }
  },
  head() {
    return {
      title: "Content",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "This is where I put all the stuff I've written. Pretty barren right now",
        },
        {
          property: 'og:title',
          content: "Content",
        },
        {
          property: 'og:description',
          content: "This is where I put all the stuff I've written. Pretty barren right now",
        },
        {
          property: 'og:image',
          content: "/ContentIcon.png"
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          property: 'twitter:site',
          content: '@enbyss'
        },
        {
          property: 'twitter:creator',
          content: '@enbyss'
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.category-banner-container {
  @apply text-left px-5 m-3 pt-2 pb-5 rounded-3xl;
  width: 400px;
  max-width: 90%;
  display: inline-block;
  color: white;
  transition: all .2s ease-in-out;

  h1 {
    font-size: 40pt;
    font-weight: 800;
    font-style: italic;
    transition: all .2 ease-in-out;
    text-shadow: 0 0 10px black;
  }

  h2 {
    font-size: 18pt;
    margin-top: -10pt;
    font-weight: 600;
    font-style: italic;
    line-height: 1.1;
    transition: all .2 ease-in-out;
    text-shadow: 0 0 10px black;
  }

  &:hover {
    filter: brightness(150%);
  }

  &:active {
    transform: scale(0.9);
  }
}

.article-banner {
  background: linear-gradient(90deg, rgb(255, 29,0), rgb(255, 136, 0), rgb(255, 29,0), rgb(255, 136, 0));
  background-size: 300% 100%;
  animation: animateBg 5s infinite linear;
}

.review-banner {
  background: linear-gradient(90deg, rgb(0, 81, 255), rgb(0, 183, 255), rgb(0, 81, 255), rgb(0, 183, 255));
  background-size: 300% 100%;
  animation: animateBg 5s infinite linear;
}

.all-banner {
  background: linear-gradient(90deg, rgb(98, 0, 255), rgb(255, 0, 157), rgb(98, 0, 255), rgb(255, 0, 157));
  background-size: 300% 100%;
  animation: animateBg 5s infinite linear;
}

@keyframes animateBg {
    0% {
        background-position: 0 0;;
    }
    100% {
        background-position: 100% 0;
    }
}

@screen sm {
  .category-banner {
    h1 {
      font-size: 50pt;
    }
    h2 {
      font-size: 20pt;
      margin-top: -10pt;
    }
  }
}
</style>
