<template>
  <div>
    <v-row>
      <CoursePost
        v-for="course in courses"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :description="course.description"
        :category-name="course.category.name"
        :price="course.price"
        :image="getImage(course.id)"
        :teacher="true"
        :can-rate="false"
        :rating-tab="course.reviews"
        :number-of-ratings="course.reviews.length"
        :delete-bool="true"
        :see-students="true"
        :current-places="course.currentPlaces"
        :places-max="course.placesMax"
        :address="course.address"
        :date-hour="course.dateHour[0]"
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
  },
  methods: {
    async getCourses() {
      const response = await this.$axios.get('/courses', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
        },
      })
      this.courses = response.data
    },
    getImage(e) {
      return `http://localhost:3000/courses/${e}/image`
    },
  },
}
</script>
