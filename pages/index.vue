<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Welcome.</h1>
    <p>
      This is my own space where I write stuff, post it, and over-design the <i>hell</i> out of everything.
    </p>
    <p>
      Someday I'll make a halfway decent homepage, but until then you're stuck staring at this meaningless text.
    </p>
    <p>
      In the meantime, feel free to click on any links in the <b>header</b>. I'm sure you'll find something there.
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Welcome.",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "Welcome to my own personal website. I almost said hell there.",
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
