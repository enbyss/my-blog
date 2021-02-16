<template>
  <div class="transition duration-200" :class="{'opacity-0': processTransition}">

    <ul>
      <li class="m-5" v-for="document of paginateddocuments" :key="document.slug">
        <DocumentLink :document="document" />
      </li>
    </ul>

    <p class="flex items-center justify-center transition duration-200">
      <span>
        <font-awesome-icon v-if="page !== 1" class="icon mr-5 origin-right" @click="goPageBack" :icon="['fas', 'caret-left']" />
      </span>
      <span class="-mt-1"> Page {{page}} of {{pageAmnt}} </span>
      <span>
        <font-awesome-icon v-if="page !== pageAmnt" class="icon ml-5 origin-left" @click="goPageForward" :icon="['fas', 'caret-right']" />
      </span>
    </p>

  </div>
</template>

<script>
import DocumentLink from "@/components/DocumentLink.vue";

export default {
  props: ['documents'],
  components : {
    DocumentLink
  },
  data() {
    return {
      page: 1,
      pageSize: 8,
      processTransition: false
    }
  },
  computed: {
    documentAmnt() {
      return this.documents.length;
    },
    pageAmnt() {
      return Math.ceil(this.documentAmnt / this.pageSize)
    },
    paginateddocuments() {
      let startingPage = (this.page-1)*this.pageSize;
      let endingPage = Math.min((this.page)*this.pageSize, this.documentAmnt);
      return this.documents.slice(startingPage, endingPage);
    }
  },
  methods: {
    goPageBack() {
      this.processTransition = true;
      setTimeout(() => {
        this.page -= 1;
        this.processTransition = false;
      }, 200);
    },
    goPageForward() {
      this.processTransition = true;
      setTimeout(() => {
        this.page += 1;
        this.processTransition = false;
      }, 200);
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
    margin: 0 auto;
    text-align: center;
}

li {
    display: inline-block;
    vertical-align: top;
}

.icon {
  @apply cursor-pointer transition duration-200;
  font-size: 28px;
  color: rgb(255, 0, 119);

  &:hover {
    transform: scale(2);
  }
}
</style>
