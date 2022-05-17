<template>
  <div>
    <v-row>
      <CoursePost
        v-for="course in courses"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :description="course.description"
        :price="course.price"
        :start-date="course.startDate"
        :see-places="false"
        :image="getImage(course.id)"
        :start-hour="course.startHour"
        :end-hour="course.endHour"
        class="col-md-4"
      />
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
    }
  },
  mounted() {
    this.getCourses()
    console.log(
      localStorage.getItem('auth.profile').split(',')[0].split(':')[1]
    )
  },

  methods: {
    getCourses() {
      this.$axios
        .get('/reservation-course', {
          params: {
            userId: localStorage
              .getItem('auth.profile')
              .split(',')[0]
              .split(':')[1],
          },
        })
        .then((response) => {
          response.data.forEach((reservation) => {
            this.courses.push(reservation.course)
          })
          console.log('Course', this.courses)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getImage(e) {
      return `http://localhost:3000/courses/${e}/image`
    },
  },
}
</script>
