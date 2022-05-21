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
      :teacher=true
      :delete-bool=true
      :see-students=true
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
  auth: 'guest',
  data() {
    return {
      loading: false,
      selection: 1,
      courses: [],
      dateHour: [],
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

