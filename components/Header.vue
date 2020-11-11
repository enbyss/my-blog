<template>
  <div>
    <header class="transition duration-200 w-full bg-white border-b-2 dark:border-blue-700
                  flex justify-center h-16 items-center bg-white border-gray-200
                  dark:bg-blue-900 dark:text-white">
      <NuxtLink :class="{'ml-5' : mobile}" to="/">
        <img src="~/assets/images/icon.png" class="h-10 mr-2 shadow-2xl rounded-full" style="box-shadow: 0 0 10px #3e8eff;"/>
      </NuxtLink>

      <input
          placeholder="Search..."
          :class="{'ml-auto mr-auto' : mobile}"
          class="transition duration-200 w-48 sm:w-72 md:w-96 bg-gray-300 h-10 rounded-xl px-5 ml-5 mr-5
                dark:bg-blue-700 dark:text-blue-200 dark:placeholder-blue-300 border-transparent border-2
                focus:border-blue-400 dark-focus:border-blue-700"
      />

      <!-- Links to other pages. -->
      <div v-if="!mobile">
        <NuxtLink class="header-link hover:bg-blue-300 hover:text-blue-800" to="/content">Blogs</NuxtLink>
        <NuxtLink class="header-link hover:bg-red-300 hover:text-red-800" to="/about">About</NuxtLink>
        <NuxtLink class="header-link hover:bg-yellow-300 hover:text-yellow-800" to="/contact">Contact</NuxtLink>
      </div>

      <!-- Buttons for dark mode and potentially the hamburger menu. -->
      <div :class="{'ml-auto mr-5' : mobile}">
        <button class="ml-3 rounded-full text-xl" @click="toggleDarkMode()">
          <font-awesome-icon v-if="!darkMode" :icon="['fas', 'sun']" />
          <font-awesome-icon v-if="darkMode" :icon="['fas', 'moon']" />
        </button>

        <button v-if="mobile" @click="showMenu = !showMenu;" class="ml-5 rounded-full text-xl">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>

    </header>

    <!-- Menu on mobile. -->
    <transition name="fade">
      <ul v-if="mobile & showMenu" class="transform origin-top absolute w-full bg-gray-100 text-gray-700 dark:bg-megadark dark:text-white font-bold text-2xl">
        <li class="bg-gray-100 dark:bg-megadark border-b-2 border-blue-200 dark:border-blue-800 h-12 flex items-center">
          <NuxtLink class="block w-full px-5" to="/content">Blogs</NuxtLink>
        </li>
        <li class="bg-gray-100 dark:bg-megadark border-b-2 border-blue-200 dark:border-blue-800 h-12 flex items-center">
          <NuxtLink class="block w-full px-5" to="/about">About</NuxtLink>
        </li>
        <li class="bg-gray-100 dark:bg-megadark border-b-2 border-blue-200 dark:border-blue-800 h-12 flex items-center">
          <NuxtLink class="block w-full px-5" to="/contact">Contact</NuxtLink>
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
      darkMode: true,
      mobile: true,
      showMenu: false,
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
      this.darkMode = !this.darkMode;
      this.$root.$emit('mode-change', this.darkMode);
    }
  },
  mounted() {
    document.documentElement.classList.add("mode-dark");
  }
}
</script>

<style scoped lang="scss">
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
</style>


