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
        :address="course.address"
        :see-places="false"
        :image="getImage(course.id)"
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
            reservation.course.author = author.data
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
