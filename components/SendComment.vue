<template>
  <div>
    <h2 class="text-3xl dark:text-white font-bold mb-2">Comments [doesn't work yet]</h2>
    <form :name="slug + '-comment-submit'" netlify @submit.prevent="'onSubmit'">
      <input class="w-full mb-4 p-3 text-xl font-bold rounded-lg dark:bg-gray-800 bg-gray-300 dark:text-white" v-model="comment.name" type="text" placeholder="Name" />
      <textarea class="w-full mb-4 p-3 text-lg rounded-lg dark:bg-gray-800 bg-gray-300 dark:text-white" v-model="comment.message" placeholder="Comment" />
      <button disabled class="w-full transition duration-200 p-3 text-xl font-bold rounded-lg dark:bg-purple-800
         dark-hover:bg-purple-600 bg-purple-300 hover:bg-purple-500 dark:text-white" @click="submitComment()">{{loading ? "Submitting..." : "Submit"}}</button>
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
      // Set a component data value for 'loading' to true, to be used in the UI
      this.loading = true
  	  // Axios supports the 'URLSearchParams' method for sending 'application/www-x-form-urlencoded' data
      let formData = new URLSearchParams();

      /* 'slug' is passed into the component as a prop.  Since the comments will
      	  be viewed through a post, the post is passing in its own url slug--
          something like 'my-new-post' or 'how-to-do-something'
      */
      formData.append('options[slug]', this.slug);

      // From our form input bindings
      formData.append('fields[name]', this.comment.name);
      formData.append('fields[email]', this.comment.email);
      formData.append('fields[message]', this.comment.message);

      // You will need to import axios for this-- or use your preferred library
      this.$axios.post('https://dev.staticman.net/v3/entry/github/enbyss/my-blog/master/comments', formData).then((response) => {
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      })
    }
  }
}
</script>
