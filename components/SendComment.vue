<template>
  <div>
    <h2 class="text-3xl dark:text-white font-bold mb-2">Comments [doesn't work yet]</h2>
    <form :name="slug + '-comment-submit'" method="POST" data-netlify="true">
      <input
        class="w-full mb-4 p-3 text-xl font-bold rounded-lg dark:bg-gray-800 bg-gray-300 dark:text-white"
        v-model="comment.name"
        name="commenter-name"
        type="text"
        placeholder="Name"
      />
      <textarea
        class="w-full mb-4 p-3 text-lg rounded-lg dark:bg-gray-800 bg-gray-300 dark:text-white"
        v-model="comment.message"
        name="comment-body"
        placeholder="Comment"
      />
      <button class="w-full transition duration-200 p-3 text-xl font-bold rounded-lg dark:bg-purple-800
         dark-hover:bg-purple-600 bg-purple-300 hover:bg-purple-500 dark:text-white" type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
form {
  margin-bottom: 50px;
}
button {
  font-family: 'Zilla Slab';
}
</style>

<script>
export default {
  props: ["slug"],
  data() {
    return {
      comment: {},
      loading: false
    }
  },
  methods: {
    submitComment() {

    }
  }
}
</script>
