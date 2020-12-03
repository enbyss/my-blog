<template>
  <div>
    <header class="transition duration-200 w-full bg-white border-b-2 dark:border-blue-700
                  flex justify-center h-16 items-center border-gray-200
                  dark:text-white">
      <NuxtLink :class="{'ml-5 mr-auto' : mobile}" to="/">
        <img src="~/assets/images/icon.png" class="w-10 h-10 hover:h-12 mr-2 shadow-2xl rounded-full main-logo" style="box-shadow: 0 0 10px #3e8eff;"/>
      </NuxtLink>

      <div class="w-3/12 mx-4 h-10 text-2xl font-bold relative overflow-hidden scroll-left ticker-thing" :class="{'w-8/12' : mobile}">
        <div class="inline-block">
          <p class="flex inline-block items-center">whoa it's december, sweet</p>
        </div>
      </div>

      <!-- <input
          placeholder="Search..."
          :class="{'ml-auto mr-auto' : mobile}"
          class="transition duration-200 w-48 sm:w-72 md:w-96 bg-gray-300 h-10 rounded-xl px-5 ml-5 mr-5
                dark:bg-gray-900 dark:text-blue-200 dark:placeholder-blue-300 border-transparent border-2
                focus:border-blue-400 dark-focus:border-blue-700 placeholder-blue-700"
      /> -->

      <!-- Links to other pages. -->
      <div v-if="!mobile">
        <NuxtLink class="header-link hover:bg-blue-300 hover:text-blue-800" to="/content">Content</NuxtLink>
        <!-- <NuxtLink class="header-link hover:bg-red-300 hover:text-red-800" to="/about">About</NuxtLink> -->
      </div>

      <!-- Buttons for dark mode and potentially the hamburger menu. -->
      <div :class="{'ml-auto mr-5' : mobile}" class="flex">
        <span v-if="!mobile" class="icon-bar h-10 inline-block mx-3">
          <a id="twitter-icon" href="https://twitter.com/enbyss_"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
          <a id="youtube-icon" href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          <a id="twitch-icon" href="https://www.twitch.tv/enbyss_"><font-awesome-icon :icon="['fab', 'twitch']" /></a>
        </span>

        <button class="transition duration-200 dark-hover:bg-gray-800 hover:bg-gray-200 w-10 h-10 rounded-full text-xl" @click="toggleDarkMode()">
          <font-awesome-icon v-if="!darkMode" :icon="['fas', 'sun']" />
          <font-awesome-icon v-if="darkMode" :icon="['fas', 'moon']" />
        </button>

        <button ref="menuButton" v-if="mobile" @click="showMenu = !showMenu;" class="ml-5 rounded-full text-xl">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>

    </header>

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
        <li class="links-bar">
          <a class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="twitter-icon" href="https://twitter.com/enbyss_"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
          <a class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="youtube-icon" href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          <a class="w-4/12 h-full flex items-center justify-center text-3xl transition duration-200" id="twitch-icon" href="https://www.twitch.tv/enbyss_"><font-awesome-icon :icon="['fab', 'twitch']" /></a>
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
    }
  },
  computed: {
    darkMode() {
      return this.$store.state.darkmode;
    }
  },
  watch: {
    darkMode() {
      if(this.darkMode){
        document.documentElement.classList.add("mode-dark");
      }
      else {
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
      console.log(this.mobile);
      this.mobile = window.innerWidth <= 863;
    },
    toggleDarkMode() {
      this.$root.$emit('mode-change', this.darkMode);
      this.$store.commit('toggleDarkmode');
    },
    onCloseMenu() {
      this.showMenu = false;
    }
  },
  mounted() {
    if(this.darkMode){
      document.documentElement.classList.add("mode-dark");
    }
    else {
      document.documentElement.classList.remove("mode-dark");
    }
  }
}
</script>

<style scoped lang="scss">
  .ticker-thing {
    background: #00000033;
    border-radius: 9px;
    box-shadow: 0 0 5px #00000088
  }

  svg:hover {
    cursor: pointer;
  }

  .icon-bar > a {
    @apply transition duration-200 rounded-full w-10 h-10 text-xl p-2 inline-flex items-center flex-row;
  }

  .icon-bar > a > svg {
    @apply w-6 h-6;
  }

  #twitter-icon:hover {
    background: #1DA1F2;
  }

  #youtube-icon:hover {
    background: red;
  }

  #twitch-icon:hover {
    background: #6441A4;
  }

  .header-link {
    @apply transition duration-200 px-4 py-2 rounded-xl mr-1;
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

  .main-logo {
    transition: all 0.2s ease-in-out;
  }

  .main-logo:hover {
    filter: hue-rotate(45deg);
    transform: scale(1.2) rotate(180deg);
  }

  .burger-menu-list {
    li {
      @apply border-t-2 border-b-2 border-gray-200 h-12 flex items-center transition transition-all duration-200 text-gray-800;
      background: linear-gradient(90deg, rgb(191, 168, 255), rgb(255, 169, 209));

      &:hover {
        @apply border-b-4 border-t-4 border-pink-600;
      }
    }

    .links-bar {
      @apply h-16
    }
  }

  // Dark mode theming
  .mode-dark {
    header {
      background: linear-gradient(90deg, rgb(68, 0, 255), rgb(255, 0, 119))
    }
    .burger-menu-list {
      li {
        @apply bg-megadark border-blue-800 text-white;
        background: linear-gradient(90deg, rgb(39, 0, 145), rgb(128, 0, 60));

        &:hover {
          @apply border-b-4 border-t-4 border-pink-600;
        }
      }
    }
  }

  // Light mode theming
  header {
    background: linear-gradient(90deg, rgb(156, 120, 255), rgb(255, 120, 183))
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
 transform: translateX(200%);
 animation: scroll-left 15s linear infinite;
}

@keyframes scroll-left {
  0%   {
    -moz-transform: translateX(200%); /* Browser bug fix */
    -webkit-transform: translateX(200%); /* Browser bug fix */
    transform: translateX(200%);
  }
  100% {
    -moz-transform: translateX(-100%); /* Browser bug fix */
    -webkit-transform: translateX(-100%); /* Browser bug fix */
    transform: translateX(-100%);
  }
}
</style>


