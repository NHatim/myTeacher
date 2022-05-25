<template>
  <div>
    <v-card class="mx-auto" max-width="520">
      <v-img
        src="https://c8.alamy.com/zooms/9/52c3ea49892f4e5789b31cadac8aa969/2gefnr1.jpg"
        height="200px"
      ></v-img>

      <v-card-title>
        {{ completeName }}
      </v-card-title>

      <v-card-subtitle>
        {{ email }}
      </v-card-subtitle>
      <v-spacer></v-spacer>
      <v-card-subtitle>
        {{ present }}
      </v-card-subtitle>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="orange lighten-2" text @click="isPresent">
          Rajouter une présence
        </v-btn>
        <v-row>
          <v-btn color="blue lighten-2" text @click="mailStudent">
            Communiquer avec les étudiants
          </v-btn></v-row
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
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
      default: '',
    },
    courseId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      show: false,
    }
  },
  methods: {
    async isPresent() {
      await this.$axios.put(
        `http://localhost:3000/reservation-course/present/${this.id}/${this.courseId}`
      )
      this.$router.push({
        name: 'yourcourses',
      })
    },

    mailStudent() {
      const userId = this.id
      const courseId = this.courseId
      this.$router.push({
        name: 'contactstudent',
        params: { userId, courseId },
        component: 'Student',
      })
    },
  },
}
</script>
