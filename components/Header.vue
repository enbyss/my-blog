<template>
  <div>
    <header class="transition duration-200 w-full
                  flex justify-center h-16 items-center
                  dark:text-white">
      <NuxtLink class="flex items-center main-link mr-5" :class="{'ml-5 mr-auto' : mobile}" to="/">
        <img src="~/assets/images/icon.png" class="w-10 h-10 mr-2 shadow-2xl rounded-full" style="box-shadow: 0 0 10px #3e8eff;"/>
        <h1 class="text-3xl font-bold title-word">ENBYSS <span v-if="isLive">IS LIVE</span> </h1>
      </NuxtLink>

      <!-- Links to other pages. -->
      <div v-if="!mobile">
        <NuxtLink class="header-link" id="content-link" to="/content">Content</NuxtLink>
        <NuxtLink class="header-link" id="tools-link" to="/tools">Tools</NuxtLink>
      </div>

      <!-- Buttons for dark mode and potentially the hamburger menu. -->
      <div :class="{'ml-auto mr-5' : mobile}" class="flex">
        <span v-if="!mobile" class="icon-bar h-10 inline-block mx-3">
          <a id="twitter-icon" href="https://twitter.com/enbyss_"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
          <a id="youtube-icon" href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          <a :class="{'live-on-twitch' : isLive}" id="twitch-icon" href="https://www.twitch.tv/enbyss_">
            <font-awesome-layers>
              <font-awesome-icon :icon="['fab', 'twitch']" />
              <font-awesome-layers-text v-if="isLive" :class="{'live-counter' : isLive}" counter transform="down-2 right-35 shrink-8" position="top-right" value="LIVE" />
            </font-awesome-layers>
          </a>
          <a id="patreon-icon" href="https://www.patreon.com/ENBYSS"><font-awesome-icon :icon="['fab', 'patreon']" /></a>
        </span>

        <button class="transition duration-200 theme-switcher w-10 h-10 rounded-full text-xl" @click="toggleDarkMode()">
          <font-awesome-icon v-if="!darkMode" :icon="['fas', 'sun']" />
          <font-awesome-icon v-if="darkMode" :icon="['fas', 'moon']" />
        </button>

        <button ref="menuButton" v-if="mobile" @click="showMenu = !showMenu;" class="ml-5 rounded-full text-xl">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>

    </header>

    <div v-if="isLive" class="px-3 py-3 w-full h-auto text-xl relative stream-announcement z-50 dark:text-white">
      <p class="flex items-center justify-center">
        <span class="font-bold mr-4">Currently streaming:</span>
        <a id="streamTitle" href="twitch.tv/enbyss_">{{streamTitle}}</a>
      </p>
    </div>

    <div class="w-full h-10 text-xl font-bold relative overflow-hidden scroll-left ticker-thing z-50 dark:text-white">
      <div ref="ticker" id="scrolling-ticker" class="ticker-scroll" :style="{'animation-duration' : tickerDuration}">
        <div class="inline-block">
          <p class="inline-block items-center mx-40" v-for="(tickerMessage, index) in tickerMessages" :key="index">
            {{tickerMessage}}
          </p>
        </div>
      </div>
    </div>

    <!-- Menu on mobile. -->
    <transition name="fade">
      <ul
        v-if="mobile & showMenu"
        v-closable="{handler: 'onCloseMenu', exclude: ['menuButton']}"
        @click="onCloseMenu"
        class="burger-menu-list transform origin-top absolute w-full bg-gray-100 text-gray-700 dark:bg-megadark dark:text-white font-bold text-2xl">
        <li>
          <NuxtLink class="block w-full px-5" to="/content">Content</NuxtLink>
        </li>
        <li>
          <NuxtLink class="block w-full px-5" to="/tools">Tools</NuxtLink>
        </li>
        <li class="links-bar">
          <a class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="twitter-icon" href="https://twitter.com/enbyss_">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </a>
          <a class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="youtube-icon" href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw">
            <font-awesome-icon :icon="['fab', 'youtube']" />
          </a>
          <a :class="{'live-on-twitch' : isLive}" class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="twitch-icon" href="https://www.twitch.tv/enbyss_">
            <font-awesome-icon :icon="['fab', 'twitch']" />
          </a>
          <a class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="patreon-icon" href="https://www.patreon.com/ENBYSS">
            <font-awesome-icon :icon="['fab', 'patreon']" />
          </a>
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      mobile: true,
      showMenu: false,
      tickerWidth: 0,
      speedFactor: 1.2,
      isLive: false,
      streamTitle: '',
      tickerMessages: [
        "richmond harrison is my best friend reply if he is yours also",
        "the enbyss is doing a great job",
        "this ticker isn't perfect, but it's trying and that's what counts",
        "spies win BANG BANG",
        "i physically can't stop messing with this site please help",
      ]
    }
  },
  async fetch() {
    let isLive = await this.$axios.get("/api/islive?user=enbyss");
    this.isLive = isLive.data.isLive;
    this.streamTitle = isLive.data.streamTitle;
  },
  computed: {
    darkMode() {
      return this.$store.state.darkmode;
    },
    tickerDuration() {
      return `${(5 + 0.01 * this.tickerWidth)/this.speedFactor}s`;
    }
  },
  watch: {
    darkMode() {
    if(this.darkMode){
      document.documentElement.classList.add("mode-dark");
      document.documentElement.classList.remove("mode-light");
    }
    else {
      document.documentElement.classList.add("mode-light");
      document.documentElement.classList.remove("mode-dark");
    }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.mobile = window.innerWidth <= 863;
    },
    toggleDarkMode() {
      this.$root.$emit('mode-change', this.darkMode);
      this.$store.commit('toggleDarkmode');
    },
    onCloseMenu() {
      this.showMenu = false;
    },
  },
  mounted() {
    if(this.darkMode){
      document.documentElement.classList.add("mode-dark");
      document.documentElement.classList.remove("mode-light");
    }
    else {
      document.documentElement.classList.add("mode-light");
      document.documentElement.classList.remove("mode-dark");
    }

    this.tickerWidth = this.$refs.ticker.clientWidth;
    setInterval(() => {
      this.$fetch();
    }, 60000);
  }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Knewave&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

  .stream-announcement {
    background: linear-gradient(90deg, rgb(103, 232, 255), rgb(204, 255, 109));
    box-shadow: 0 0 5px #00000088;
  }

  #streamTitle {
    font-family: 'Staatliches';
    font-size: 20pt;
    background-image: linear-gradient(to left, rgb(0, 156, 39), rgb(0, 55, 138));
    filter: drop-shadow(0 0 4px white);
    -webkit-background-clip: text;
    color: transparent;
    transition: all 0.2s ease-in-out;
  }

  #streamTitle:hover {
    letter-spacing: 1px;
  }

  .ticker-thing {
    background: linear-gradient(90deg, rgb(130, 85, 255), rgb(255, 105, 175));
    box-shadow: 0 0 5px #00000088;
  }

  .title-word {
    font-family: var(--icon-font);
    background-image: linear-gradient(to left, rgb(55, 0, 255), rgb(146, 0, 85));
    -webkit-background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 4px crimson);
  }

  .title-word {
    background-image: var(--title-bg);
  }

  .ticker-scroll {
    padding-left: 100%;
  }

  svg:hover {
    cursor: pointer;
  }

  .icon-bar > a {
    @apply transition duration-200 rounded-full w-10 h-10 text-xl p-2 inline-flex items-center flex-row;
  }

  .icon-bar > a:hover, .theme-switcher:hover {
    background: var(--secondary-colour);
    color: var(--main-colour);
  }

  .icon-bar > a svg {
    @apply w-6 h-6;
  }

  .live-on-twitch {
    animation: pulsate-live 2s linear infinite;
  }

  .live-counter {
    animation: pulsate-live-counter 2s linear infinite;
  }

  .header-link {
    @apply transition duration-200 px-4 py-2 rounded-xl;
    background: #ffffff55;
  }

  #content-link:hover {
    @apply bg-blue-300 text-blue-800;
  }

  #tools-link:hover {
    @apply bg-red-300 text-red-800;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease-in-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    @apply translate-x-full h-0;
  }
  .fade-enter-to, .fade-leave {
    @apply translate-x-0 h-auto;
  }

  .main-link {
    transition: all 0.2s ease-in-out;
  }

  .main-link:hover {
    transform: scale(1.1);
    filter: hue-rotate(10deg);
  }

  .burger-menu-list {
    li {
      @apply h-12 flex items-center transition transition-all duration-200 text-gray-800;
      color: var(--text);
      background: var(--bg-header);
      box-shadow: 0 0 10px #00000055;
    }

    .links-bar {
      @apply h-16
    }
  }

  header {
    background: var(--bg-header);
  }

  .ticker-thing {
    background: var(--bg-ticker);
    box-shadow: 0 0 5px #00000088;
  }

  // Dark mode theming
  .mode-dark {
    .header-link {
      background: #00000055;
    }
    #streamTitle {
      background-image: linear-gradient(to left, rgb(91, 255, 132), rgb(52, 133, 255));
      filter: drop-shadow(0 0 4px black);
    }
    .stream-announcement {
      background: linear-gradient(90deg, rgb(0, 47, 255), rgb(0, 112, 0));
    }
  }

.scroll-left > div {
 position: absolute;
//  width: 100%;
  white-space: nowrap;
  display: flex;
  align-items: center;
 height: 100%;
 margin: 0;
 line-height: 50px;
 text-align: center;
 /* Starting position */
 animation: scroll-left 15s linear infinite;
}

@keyframes scroll-left {
  0%   {
    transform: translateZ(0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes pulsate-live {
  0% {
    color: #FF79C5;
  }
  100% {
    color: inherit;
  }
}

@keyframes pulsate-live-counter {
  0% {
    background: #FF79C5;
  }
  100% {
    background: red;
  }
}
</style>


