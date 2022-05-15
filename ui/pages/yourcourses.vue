<template>
  <div>
    <v-row>
    <CoursePost
      v-for="course in courses"
      :key="course.id"
      :title="course.title"
      :description="course.description"
      :category-name="course.category.name"
      :price="course.price"
      :start-date="course.startDate"
      :image="getImage(course.id)"
      :button-text="'Modifier'"
      :places="course.places"
      :start-hour="course.startHour"
      :end-hour="course.endHour"
      class="col-md-4"
    />
    </v-row>
    </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      loading: false,
      selection: 1,
      courses: [],
      image: null,
    }
  },
  mounted() {
    this.getCourses()
  },
  methods: {
    async getCourses() {
      const response = await this.$axios.get(
        `/courses/${
          localStorage.getItem('auth.profile').split(',')[0].split(':')[1]
        }`
      )
      this.courses = response.data
    },
    getImage(e) {
      return `http://localhost:3000/courses/${e}/image`
    },
  },
}
</script>

