<template>
  <div class="w-full h-full">
    <Header class="sticky top-0 z-50" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.add("bg-white", "transition", "duration-200");
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

h1, h2, h3, h4, p, a, figcaption, ul, li, table > *, input, textarea {
  font-family: 'Zilla Slab';
}

.mode-dark {
  body {
    background: rgb(14, 0, 36);
  }
}
</style>
