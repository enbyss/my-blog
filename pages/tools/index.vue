<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Find your tool.</h1>

    <ul class="w-full mx-auto text-center">
      <li class="tool-container" v-for="(tool, index) of tools" :key="index">
        <NuxtLink class="tool-link" :to="tool.link">
          <h1 class="px-5 pt-3 pb-2">{{tool.name}}</h1>
          <h2 class="px-5 pt-2 pb-3">{{tool.description}}</h2>
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
      tools: [
        {
          name: 'Channel Points Icon Generator',
          description: 'A tool to generate the icons for channel points, in all three sizes.',
          link: '/tools/channel-points-icon-gen',
        },
      ]
    }
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

.tool-container {
  @apply text-left m-3 rounded-3xl;
  width: 400px;
  max-width: 90%;
  display: inline-block;
  color: white;
  transition: all .2s ease-in-out;
  background: linear-gradient(90deg, rgb(255, 29,0), rgb(255, 136, 0), rgb(255, 29,0), rgb(255, 136, 0));
  background-size: 300% 100%;
  animation: animateBg 5s infinite linear;

  h1 {
    font-size: 24pt;
    font-weight: 800;
    font-style: italic;
    transition: all .2 ease-in-out;
    text-shadow: 0 0 10px black;
    line-height: 30px;
  }

  h2 {
    font-size: 15pt;
    font-weight: 600;
    font-style: italic;
    line-height: 1.1;
    transition: all .2 ease-in-out;
    text-shadow: 0 0 10px black;
    background: rgba(0,0,0,0.5);
  }

  &:hover {
    filter: brightness(150%);
  }

  &:active {
    transform: scale(0.9);
  }
}

@keyframes animateBg {
    0% {
        background-position: 0 0;;
    }
    100% {
        background-position: 100% 0;
    }
}
</style>
