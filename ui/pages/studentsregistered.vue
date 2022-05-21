<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      listStudents: [],
    }
  },
  mounted() {
    this.getStudents()
    console.log(this.$router.currentRoute.params.courseId)
  },
  methods: {
    getStudents() {
      this.$axios
        .get(`http://localhost:3000/reservation-course/studentbycourse/${this.$router.currentRoute.params.courseId}`, {
          params: {
            id: Number(this.$router.currentRoute.params.courseId),
          },
        })
        .then(({ data }) => {
          this.listStudents = data
          console.log(this.listStudents)
        })
    },
  },
}
</script>
