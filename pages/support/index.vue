<template>
  <div class="flex flex-col justify-center text-center dark:text-white">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex flex-col justify-center text-center dark:text-white" key="loading">
        <h1 class="mt-5 loading-text" style="font-size:50pt; text-shadow: 0 0 5pt white;">
          LOADING...
        </h1>
      </div>
      <div v-else class="flex flex-col justify-center text-center dark:text-white" key="done">
        <h1 class="mt-5" style="font-size:30pt; text-shadow: 0 0 5pt white;">
          METRICS AND GOALS
        </h1>

        <a class="site-link mx-auto" id="yt-metric" href="https://www.youtube.com/channel/UCvsQyeyBvvOOppg2R0vsfPw?sub_confirmation=1">
          <h1>
            <font-awesome-icon :icon="['fab', 'youtube']" /> Subscribers:
            <span class="amount-funded">{{youtubeSubs}} <span class="goal">/ 100</span></span>
          </h1>
        </a>

        <a class="site-link mx-auto" id="tw-metric" href="https://www.twitch.tv/enbyss_">
          <h1>
            <font-awesome-icon :icon="['fab', 'twitch']" /> Followers:
            <span class="amount-funded">{{twitchFollowers}} <span class="goal">/ 200</span></span>
          </h1>
        </a>

        <a class="site-link mx-auto" id="pt-metric" href="https://www.patreon.com/ENBYSS">
          <h1>
            <font-awesome-icon :icon="['fab', 'patreon']" /> Per Month:
            <span class="amount-funded">€{{(totalAmount / 100).toFixed(2)}} <span class="goal">/ €50</span></span>
          </h1>
        </a>

        <h2 class="mt-8">
          ENDLESS THANKS TO MY PATRONS:
        </h2>

        <h1 class="tier">GIGABYSS</h1>
        <i class="tier-price">($9.50+)</i>
        <div>
          <span class="mx-4" v-for="(patron, index) in patreonData.GIGABYSS" :key=index>
            {{patron.name}}
          </span>
        </div>

        <h1 class="tier">MEGABYSS</h1>
        <i class="tier-price">($5+)</i>
        <div>
          <span class="mx-4" v-for="(patron, index) in patreonData.MEGABYSS" :key=index>
            {{patron.name}}
          </span>
        </div>

        <h1 class="tier">ABYSS</h1>
        <i class="tier-price">($3+)</i>
        <div>
          <span class="mx-4" v-for="(patron, index) in patreonData.ABYSS" :key=index>
            {{patron.name}}
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      patreonData: {},
      totalAmount: 0,
      twitchFollowers: 0,
      youtubeSubs: 0,
      loading: true,
    }
  },
  async fetch() {
    let enbyssMetrics = await this.$axios.get("/api/enbyssmetrics");
    console.log("ENBYSS METRICS TIME!");
    const patreonData = enbyssMetrics.data.patreonData;

    this.patreonData["ABYSS"] = patreonData.ABYSS;
    this.patreonData["MEGABYSS"] = patreonData.MEGABYSS;
    this.patreonData["GIGABYSS"] = patreonData.GIGABYSS;

    this.totalAmount = patreonData.totalAmount;
    this.twitchFollowers = enbyssMetrics.data.twitchFollowers;
    this.youtubeSubs = enbyssMetrics.data.youtubeSubs;

    this.loading = false;
  },
  mounted() {
    setInterval(() => {
      this.$fetch();
    }, 60000);
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 24pt;
  font-weight: 600;
}

h2 {
  font-size: 19pt;
  font-weight: 600;
}

.amount-funded {
  color: var(--secondary-colour);
  text-shadow: 0 0 5px var(--main-colour);
  font-style: italic;
}

.loading-text {
  font-family: var(--icon-font);
}

#gigabyss {
  width: 200px;
  background-image: linear-gradient(90deg, var(--passion4), var(--warm4));
  color: transparent;
  -webkit-background-clip: text;
}

#yt-metric {
  background: #ff0000a4;
  width: 400px;
  border-top-left-radius: 10pt;
  border-top-right-radius: 10pt;
  padding: 3px;
}

#tw-metric {
  background: #8400ffa1;
  width: 400px;
  padding: 3px;
}

#pt-metric {
  background: #ff73009c;
  width: 400px;
  border-bottom-left-radius: 10pt;
  border-bottom-right-radius: 10pt;
  padding: 3px;
}

.tier {
  color: var(--passion4);
  margin-top: 10pt;
}

.goal {
  font-size: 15pt;
}

.tier-price {
  font-size: 12pt;
  margin-top: -5pt;
  margin-bottom: 8pt;
  color: var(--warm5);
}

.site-link {
  transition: all 0.2s ease-in-out;
}

.site-link:hover {
  filter: brightness(150%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
