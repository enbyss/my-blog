<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <a style="display: none;" rel="me" href="https://hellsite.site/@enbyss">Mastodon</a>
    <h1 class="title text-6xl font-bold">Yo.</h1>
    <h2 class="text-3xl mx-auto w-10/12">
      Hello, I'm <b>Enbyss</b>. My pronouns are <b>they/them</b> and this is... well, <i>my site.</i>
    </h2>
    <div class="text-md">
      Check the header for different pages!
    </div>
    <p> 
      Here are links to some of the stuff I do. Any subs/follows/patronage is <i>heavily</i> appreciated! Someday I'll put more stuff on this page.
    </p>
    <p class="icon-bar">
      <a href="https://twitter.com/enbyss_"><font-awesome-icon id="twitter-icon" :icon="['fab', 'twitter']" size="3x" /></a>
      <a href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw"><font-awesome-icon id="youtube-icon" :icon="['fab', 'youtube']" size="3x" /></a>
      <a href="https://www.twitch.tv/enbyss_"><font-awesome-icon id="twitch-icon" :icon="['fab', 'twitch']" size="3x" /></a>
      <a href="https://www.patreon.com/enbyss"><font-awesome-icon id="patreon-icon" :icon="['fab', 'patreon']" size="3x" /></a>
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
  @apply text-xl w-10/12 mx-auto my-5;
}

svg:hover {
  cursor: pointer;
}

.icon-bar > a {
  @apply mx-5;
}

#twitter-icon, #youtube-icon, #twitch-icon, #patreon-icon {
  transition: all .2s ease-in-out;
}

#twitter-icon {
  filter: drop-shadow( 0 0 10px #1DA1F2);
}

#youtube-icon {
  filter: drop-shadow( 0 0 10px red);
}

#twitch-icon {
  filter: drop-shadow( 0 0 10px #6441A4);
}

#patreon-icon {
  filter: drop-shadow( 0 0 10px #ff6a06);
}

#twitter-icon:hover {
  color: #1DA1F2;
}

#youtube-icon:hover {
  color: red;
}

#twitch-icon:hover {
  color: #6441A4;
}

#patreon-icon:hover {
  color: #ff6a06;
}

@screen lg {
  p {
    @apply w-5/12;
  }
}
</style>
