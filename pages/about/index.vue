<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">About Me.</h1>
    <p>
      Welcome to my humble blog. This page is currently empty, <b>particularly</b> because I don't have much of an idea for what to put on here.
    </p>
    <p>
      From the links above, a lot of them <b><i>work</i></b>, but their pages aren't fully working yet. Do forgive me, I am indeed trying to be a good host.
    </p>
    <p>
      I hope you like the way this page looks however. Someday I'll figure out what to put on here.
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
