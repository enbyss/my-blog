<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">About Me.</h1>
    <p>
      For now, I'll just simply be an <b><i>enigma.</i></b> At least, until I decide to actually work on this page.
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "About.",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "Unfortunately, this page is incomplete. Someday it won't be though.",
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
