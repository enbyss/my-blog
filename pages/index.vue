<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Yo.</h1>
    <h2 class="text-3xl mx-auto w-10/12">
      Hello, I'm <b>Enbyss</b>. My pronouns are <b>they/them</b> and this is... well, <i>my site.</i>
    </h2>
    <div class="text-md">
      Check the header for different pages!
    </div>
    <p>
      Basically, this place serves as a playground or <i>library</i> in a sense, of things that I
      may be working on. Some of this includes writing in the form of <i>informal reviews</i> (as
      I am not a professional reviewer), <i>articles</i> (<i>blogposts</i> is a more accurate term,
      but yeah), and possibly more in the future.
    </p>
    <p>
      I have quite a lot of hobbies, you could say. <b>Too many</b>. Which also means that I'm all over
      the place. The <b>main</b> things I do, mostly, are <i>stream games</i>, <i>edit youtube videos (kind of)</i>,
      and <i>program stuff</i>.
    </p>
    <p>
      This website, honestly, should be proof enough of how into programming I am. As for youtube and streaming, you could
      see as much in the links below this paragraph.
    </p>
    <p class="icon-bar">
      <a href="https://twitter.com/enbyss_"><font-awesome-icon id="twitter-icon" :icon="['fab', 'twitter']" size="3x" /></a>
      <a href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw"><font-awesome-icon id="youtube-icon" :icon="['fab', 'youtube']" size="3x" /></a>
      <a href="https://www.twitch.tv/enbyss_"><font-awesome-icon id="twitch-icon" :icon="['fab', 'twitch']" size="3x" /></a>
    </p>
    <p>
      You may see that my twitter is less than <b>professional</b>, and my youtube is a bit <b>inactive</b>. The former is because I want to put an honest
      foot forward in a sense, and be consistently <b>me.</b> Mostly because that's the most comfortable way to act for me, and because <i>consistency helps.</i>
    </p>
    <p>
      The latter however is because editing is hard. I'm workin' on that. Trying to.
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

#twitter-icon, #youtube-icon, #twitch-icon {
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

#twitter-icon:hover {
  color: #1DA1F2;
}

#youtube-icon:hover {
  color: red;
}

#twitch-icon:hover {
  color: #6441A4;
}

@screen lg {
  p {
    @apply w-5/12;
  }
}
</style>
