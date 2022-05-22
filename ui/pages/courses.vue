<template>
  <div>
    <v-row class="filters">
      <v-col cols="12" md="3">
        <v-select
          class="category"
          :items="categories"
          label="Catégorie"
          @input="setCategory"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          class="category"
          :items="teachers"
          label="Enseignants"
          @input="setTeacher"
        ></v-select>
      </v-col>
      <v-col cols="8" md="1">
        <v-text-field
          label="Montant min"
          :v-model="priceMin"
          :value="priceMin"
          prefix="€"
        ></v-text-field>
      </v-col>
      <v-col cols="8" md="1">
        <v-text-field
          label="Montant max"
          :v-model="priceMax"
          :value="priceMax"
          prefix="€"
        ></v-text-field>
      </v-col>

      <v-btn class="primary filterbtn" @click="filter">Filtrer</v-btn>
    </v-row>

    <v-row>
      <CoursePost
        v-for="course in coursesFiltered"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :author="course.author.completeName"
        :description="course.description"
        :category-name="course.category.name"
        :rating-tab="course.reviews"
        :number-of-ratings="course.reviews.length"
        :price="course.price"
        :places-max="course.placesMax"
        :current-places="course.currentPlaces"
        :date-hour="course.dateHour[0]"
        :address="course.address"
        :image="getImage(course.id)"
        :student="true"
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
      coursesFiltered: [],
      categories: [0],
      categoryId: 0,
      teachers: [0],
      teacherId: 0,
      priceMin: 0,
      priceMax: 0,
    }
  },
  mounted() {
    this.getCourses()
    this.getCategories()
    this.getTeachers()
  },
  methods: {
    filter(){
      if(this.categoryId === 0 && this.teacherId === 0 && this.priceMin === 0 && this.priceMax === 0){
        this.coursesFiltered = this.courses
      }
      else if(this.categoryId === 0 && this.teacherId === 0){
        this.coursesFiltered = this.courses.filter(course => course.price >= this.priceMin && course.price <= this.priceMax)
      }
      else if(this.categoryId === 0 && this.priceMin == 0 && this.priceMax === 0){
        this.coursesFiltered = this.courses.filter(course => course.author.id === this.teacherId)
      }
      else if(this.teacherId === 0 && this.priceMin === 0 && this.priceMax === 0){
        this.coursesFiltered = this.courses.filter(course => course.category.id === this.categoryId)
      }
      else if(this.categoryId === 0){
        this.coursesFiltered = this.courses.filter(course => course.price >= this.priceMin && course.price <= this.priceMax && course.teacher.id === this.teacherId)
      }
      else if(this.teacherId === 0){
        this.coursesFiltered = this.courses.filter(course => course.price >= this.priceMin && course.price <= this.priceMax && course.category.id === this.categoryId)
      }
      else if(this.priceMin === 0 && this.priceMax === 0){
        console.log("ici")
        this.coursesFiltered = this.courses.filter(course => course.category.id === this.categoryId && course.author.id === this.teacherId)
      }
      else{
        this.coursesFiltered = this.courses.filter(course => course.price >= this.priceMin && course.price <= this.priceMax && course.category.id === this.categoryId && course.author.id === this.teacherId)
      }
    },
    getCourses() {
      this.$axios
        .get('/courses')
        .then((response) => {
          this.courses = response.data
          this.coursesFiltered = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getCategories() {
      const response = await this.$axios.$get('/category')
      response.forEach((category) => {
        this.categories.push({
          text: category.name,
          value: category.id,
        })
      })
    },
    getImage(e) {
      return `http://localhost:3000/courses/${e}/image`
    },
    setCategory(category) {
      this.categoryId = category
    },
    setCoursesCategory() {
      if (this.categoryId == 'Toutes les catégories') {
        return (this.coursesFiltered = this.courses)
      }
      this.coursesFiltered = this.courses.filter((course) => {
        return course.category.id === this.categoryId
      })
      console.log(this.categoryId === 'Toutes les catégories')
    },
    setTeacher(teacher) {
      this.teacherId = teacher
    },
    getTeachers() {
      this.$axios
        .get('/users/findteachers')
        .then((response) => {
          response.data.forEach((teacher) => {
            this.teachers.push({
              text: teacher.completeName,
              value: teacher.id,
            })
          })
          console.log(this.teachers)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // setCoursesTeacher() {
    //   if (this.teacherId == 'Tous les enseignants') {
    //     return (this.coursesFiltered = this.courses)
    //   }
    //   this.coursesFiltered = this.courses.filter((course) => {
    //     return course.author.id === this.teacherId
    //   })
    // },
  },
}
</script>

<style scoped>
.filters {
  margin-left: 20px;
}
.category {
  margin-left: 10em;
}
.filterbtn {
  margin-top: 2em;
  margin-left: 2em;
}
</style>
