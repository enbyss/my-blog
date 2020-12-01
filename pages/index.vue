<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Yo.</h1>
    <p>
      Hello, I'm <b>Enbyss.</b> I do a lot of things, but this website here is more of a personal project
      for me to learn about creating a site, and program as a hobby.
    </p>
    <p>
      On here, I plan to be doing and hosting many things, but for the time being I'm mostly focused on creating
      <i>written</i> content, such as reviews and articles. As time passes, the site will grow <i>(hopefully)</i>
      so feel free to check back later as well.
    </p>
    <p>
      As for links, I do have a twitter <a href="https://twitter.com/enbyss_">here.</a> I also have two youtube channels,
      one for <a href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw">edited content</a> that I admittedly don't use much,
      and one where I upload my <a href="https://www.youtube.com/channel/UC88yu6qLzwoM53aXLGHiKJQ">full streams.</a> Speaking of streaming,
      <a href="https://www.twitch.tv/enbyss_">here's my twitch.</a>
    </p>
    <p>
      Feel free to follow my links and check out my stuff above! Also feel free to browse this site. I'm kinda proud of it.
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "yo.",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "sweet website, eh?",
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
