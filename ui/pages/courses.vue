<template>
  <div>
    <v-row>
      <CoursePost
        v-for="course in courses"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :author="course.author.completeName"
        :description="course.description"
        :category-name="course.category.name"
        :price="course.price"
        :places-max="course.placesMax"
        :current-places="course.currentPlaces"
        :date-hour="course.dateHour[0]"
        :address="course.address"
        :image="getImage(course.id)"
        class="col-md-4"
      />
    </v-row>
  </div>
</template>

<script>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CoursePost from '~/components/CoursePost.vue'
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
    getCourses() {
      this.$axios
        .get('/courses')
        .then((response) => {
          this.courses = response.data
          console.log(this.courses)
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
