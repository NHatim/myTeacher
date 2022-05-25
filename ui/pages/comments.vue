<template>
  <div>
    <v-row>
    <v-card
    v-for="review in reviews"
      :key="review.id"
      class="mx-auto review"
      color="#1a9c4c"
      dark
      max-width="400"
    >
      <v-card-title>
        <v-icon large left> mdi-message-reply-text </v-icon>
        <span class="text-h6 font-weight-light">Avis</span>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold">
{{ review.content }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              alt=""
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{review.user.completeName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reviews: [],
    }
  },
  mounted() {
    this.getReviews()
    console.log(this.reviews)
  },
  methods: {
    async getReviews() {
      const response = await this.$axios.get(
        `/reviews/${this.$router.currentRoute.params.courseId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
          },
        }
      )
      this.reviews = response.data
    },
  },
}
</script>

<style>
.review {
  margin-top: 2em;
}
</style>
