<template>
  <div>
    <v-alert
      v-if="alert"
      v-model="alert"
      dense
      elevation="2"
      dismissible
      type="error"
      >Vous n'avez soit pas rempli la description soit pas donner de
      note</v-alert
    >
    <v-card-title> Note du cours : </v-card-title>
    <v-rating
      v-model="review.rating"
      background-color="warning lighten"
      color="warning"
      label="Note"
      :max="5"
      :min="1"
      size="24"
      class="v-rating__star"
      required
    ></v-rating>
    <v-col cols="5">
      <v-textarea
        v-model="review.content"
        color="teal"
        required
        :rules="[(v) => !!v || 'Veuillez entrer la description de la note']"
      >
        <template v-slot:label>
          <div>Description de la note</div>
        </template>
      </v-textarea>
    </v-col>
    <v-btn
      color="green"
      elevation="5"
      class="v-rating__star"
      large
      @click="saveReview"
      >Envoyez l'avis</v-btn
    >

    <v-snackbar
      v-if="snackbar"
      :timeout="-1"
      :v-model="snackbar"
      absolute
      bottom
      color="success"
      outlined
      right
    >
      Vous avez noté le cours avec succès
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      alert: false,
      review: {
        content: '',
        rating: 1,
      },
    }
  },

  mounted() {},

  methods: {
    async saveReview() {
      if (this.review.content && this.review.rating) {
        try {
          this.review.courseId = this.$router.currentRoute.params.courseId
          this.review.userId = this.$router.currentRoute.params.userId
          await this.$axios.post(`/reviews`, this.review)
          this.snackbar = true
          setTimeout(this.$router.push(`/studentcourses`), 1000)
        } catch (e) {
          console.log(e)
        }
      } else {
        this.alert = true
      }
    },
  },
}
</script>

<style>
.v-rating__star {
  margin-left: 0.5em;
}
</style>
