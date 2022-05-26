<template>
  <div>
    <v-row>
      <CoursePost
        v-for="course in courses"
        :id="course.id"
        :key="course.id"
        :author="course.author"
        :title="course.title"
        :description="course.description"
        :price="course.price"
        :date-hour="course.dateHour[0]"
        :number-of-ratings="course.reviews.length"
        :rating-tab="course.reviews"
        :contact-teacher="true"
        :address="course.address"
        :see-places="false"
        :can-rate="true"
        :image="getImage(course.id)"
        :refund="true"
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
    console.log(this.courses)
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
          response.data.forEach(async (reservation) => {
            const author = await this.$axios.get(
              '/users/user/' + reservation.course.authorId,
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
                },
              },
              {
                params: {
                  id: reservation.course.authorId,
                },
              }
            )
            const reviews = await this.$axios.get(
              '/reviews/' + reservation.course.id, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
                },
              }
            )
            reservation.course.author = author.data
            reservation.course.reviews = reviews.data
            this.courses.push(reservation.course)
          })
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
