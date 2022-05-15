<template>
  <div>

  </div>
</template>

<script>
export default{
  data() {
    return {
      courses: [],
    }
  },
  mounted() {
    this.getCourses()
  },

  methods: {
    getCourses() {
      this.$axios
        .get('/courses')
        .then((response) => {
          this.courses = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

}
</script>
