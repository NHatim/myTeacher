<template>
  <div>
    <v-alert
      v-if="alert"
      v-model="alert"
      dense
      elevation="2"
      dismissible
      type="error"
    >
      <strong
        >Vous ne pouvez pas supprimer des cours qui ont déjà été achetés</strong
      >
    </v-alert>
    <v-alert
      v-if="alertPresence"
      v-model="alertPresence"
      dense
      elevation="2"
      dismissible
      type="error"
    >
      <strong
        >Vous n'avez toujours pas participer au cours, ou bien vous avez déjà
        donné votre avis pour ce cours</strong
      >
    </v-alert>

    <v-row>
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="250" :src="image"></v-img>

        <v-card-title>{{ title }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text v-if="author"> Auteur du cours : {{ author }}</v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">
              {{ rating }} ({{ numberOfRatings }})
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            € {{ price }} • {{ categoryName }}
          </div>

          <div>
            Description : {{ description }} <br />
            Lieu du cours : {{ address }} <br />
            <span v-if="seePlaces">
              Nombre de places disponible : {{ currentPlaces }} sur
              {{ placesMax }}</span
            >
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title> Date de(s) cours</v-card-title>
        <v-card-text>
          <div>{{ dateHour }} <br /></div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="student"
            color="deep-purple lighten-2"
            text
            @click="reserve"
          >
            Réserver
          </v-btn>
          <v-btn
            v-if="teacher"
            color="deep-purple lighten-2"
            text
            @click="modify"
          >
            Modifier
          </v-btn>
          <v-btn v-if="canRate" color="blue lighten-2" text @click="rate">
            Noter
          </v-btn>
          <v-btn
            v-if="deleteBool"
            color="error"
            depressed
            text
            @click="deleteCourse"
          >
            Supprimer
          </v-btn>
          <v-btn
            v-if="seeStudents"
            color="deep-purple lighten-2"
            text
            @click="seeStudentRegistered"
          >
           Voir Etudiant(s)
          </v-btn>
                    <v-btn
            v-if="contactTeacher"
            color="deep-purple lighten-2"
            text
            @click="contactTeacherEmail"
          >
           Contacter l'enseignant(e)
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CoursePost',
  props: {
    image: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    },
    title: {
      type: String,
      default: '',
    },
    ratingTab: {
      type: Array,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    categoryName: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    dateHour: {
      type: String,
    },
    buttonText: {
      type: String,
      default: '',
    },
    deleteBool: {
      type: Boolean,
      default: false,
    },
    currentPlaces: {
      type: Number,
      default: 0,
    },
    placesMax: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
    startHour: {
      type: String,
      default: '',
    },
    endHour: {
      type: String,
      default: '',
    },
    deleteButton: {
      type: Boolean,
      default: false,
    },
    seePlaces: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
      default: '',
    },
    seeStudents: {
      type: Boolean,
      default: false,
    },
    student: {
      type: Boolean,
      default: false,
    },
    teacher: {
      type: Boolean,
      default: false,
    },
    canRate: {
      type: Boolean,
      default: false,
    },
    contactTeacher: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      alertPresence: false,
      alert: false,
      loading: false,
      totalRating: 0,
      rating: 0,
    }
  },
  mounted() {
    setTimeout(this.calculateRating, 1000);
  },
  methods: {
    reserve() {
      if(!localStorage.getItem('auth.profile')){
       return alert("Vous devez vous inscrire pour réserver un cours");
      }
      const courseId = this.id
      this.$router.push({
        name: 'checkout',
        params: { courseId },
        component: 'CoursePost',
      })
    },

    async deleteCourse() {
      const courseId = this.id
      try {
        const response = await this.$axios.delete(`/courses/${courseId}`)
        if (response.data.success) {
          this.$router.push({
            name: 'courses',
            component: 'CoursePost',
          })
        }
      } catch {
        this.alert = true
      }
    },

    seeStudentRegistered() {
      const courseId = this.id
      this.$router.push({
        name: 'studentsregistered',
        params: { courseId },
        component: 'CoursePost',
      })
    },
    renderDate() {
      return this.dateHour.replace(',', ' | Date : ')
    },
    modify() {
      const courseId = this.id
      this.$router.push({
        name: 'modifycourse',
        params: { courseId },
        component: 'CoursePost',
      })
    },
    contactTeacherEmail() {
      const courseId = this.id
      this.$router.push({
        name: 'contactteacher',
        params: { courseId },
        component: 'CoursePost',
      })
    },

    async rate() {
      const courseId = this.id
      const userId = parseInt(
        localStorage.getItem('auth.profile').split(',')[0].split(':')[1]
      )
      const response = await this.$axios.get(
        `/reservation-course/is-present/${userId}/${courseId}`
      )
      const alreadyReviewed = await this.$axios.get(
        `reviews/${userId}/${courseId}`
      )
      if (response.data.attended && !alreadyReviewed.data) {
        this.$router.push({
          name: 'ratecourse',
          params: { courseId, userId },
          component: 'CoursePost',
        })
      } else {
        this.alertPresence = true
      }
    },
    calculateRating() {
      this.ratingTab.forEach((rating) => {
        this.totalRating += rating.rating
      })

      this.rating = this.totalRating / this.ratingTab.length
      if(this.ratingTab.length === 0) {
        this.rating = 0
      }
    },
  },
}
</script>

