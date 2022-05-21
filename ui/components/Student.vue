<template>
  <div>
     <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ completeName }}
    </v-card-title>

    <v-card-subtitle>
      {{ email }}
    </v-card-subtitle>

    <v-card-subtitle>
      {{ present }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="isPresent"
      >
      Présent
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
export default{
  props:
  {
    completeName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    present: {
      type: String,
      default: 'NON-PRESENT',
    },
  },

data() {
  return {
    show: false,
  }
},
methods: {
  isPresent(){
    const present = this.$axios.put(`http://localhost:3000/reservation-course/present/${this.id}`)
    console.log(present)
  }
},
}
</script>
