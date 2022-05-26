<template>
  <div>
    <v-card-title> Cours créer </v-card-title>
    <CoursePost
      v-for="course in courseCreated"
      :id="course.id"
      :key="course.id"
      :title="course.title"
      :description="course.description"
      :category-name="course.category.name"
      :price="course.price"
      :image="getImage(course.id)"
      :can-rate="false"
      :rating-tab="course.reviews"
      :number-of-ratings="course.reviews.length"
      :current-places="course.currentPlaces"
      :places-max="course.placesMax"
      :address="course.address"
      :date-hour="course.dateHour[0]"
      class="col-md-4"
    />

    <v-card-title> Cours souscrit </v-card-title>

          <CoursePost
        v-for="course in courseStudent"
        :id="course.id"
        :key="course.id"
        :author="course.author.completeName"
        :title="course.title"
        :description="course.description"
        :price="course.price"
        :date-hour="course.dateHour[0]"
        :number-of-ratings="course.reviews.length"
        :rating-tab="course.reviews"
        :address="course.address"
        :see-places="false"
        :image="getImage(course.id)"
        class="col-md-4"
      />
    </v-row>
  </div>
</template>

<script>
import CoursePost from '~/components/CoursePost.vue'
export default {
  data() {
    return {
      courseCreated: [],
      courseStudent: [],
    }
  },
  mounted() {
    this.getCourseCreated()
    this.getCourseStudent()
  },
  methods: {
    async getCourseCreated() {
      const response = await this.$axios.get(
        `/courses/${this.$router.currentRoute.params.userId}`
      )
      this.courseCreated = response.data
    },
    async getCourseStudent() {
      const response = await this.$axios.get(
        `/reservation-course/student/${this.$router.currentRoute.params.userId}`
      )
      this.courseStudent = response.data
    },
    getImage(e) {
      return `http://localhost:3000/courses/${e}/image`
    },
  },
  components: { CoursePost },
}
</script>
