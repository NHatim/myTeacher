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
      <v-card-subtitle
        v-if="seeRole"
        color="blue lighten-2"
        text
        @click="viewCourse"
      >
        {{ role }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          v-if="seePresence"
          color="orange lighten-2"
          text
          @click="isPresent"
        >
          Rajouter une présence
        </v-btn>
        <v-row>
          <v-btn
            v-if="seePresence"
            color="blue lighten-2"
            text
            @click="mailStudent"
          >
            Communiquer avec les étudiants
          </v-btn>
          <v-btn
            v-if="seeCourse"
            color="blue lighten-2"
            text
            @click="viewCourse"
          >
            Voir les cours
          </v-btn>

          <v-btn
            v-if="canModify"
            color="blue lighten-2"
            text
            @click="modifyRole"
          >
            Modifier le rôle
          </v-btn>

          <v-btn
            v-if="canModify"
            color="red lighten-2"
            text
            @click="deleteUser"
          >
            Supprimer l'utilisateur
          </v-btn>
        </v-row>
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
    role: {
      type: String,
      default: '',
    },
    courseId: {
      type: Number,
      default: 0,
    },
    seeRole: {
      type: Boolean,
      default: false,
    },
    seeCourse: {
      type: Boolean,
      default: false,
    },
    seePresence: {
      type: Boolean,
      default: true,
    },
    canModify: {
      type: Boolean,
      default: false,
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

    viewCourse() {
      const userId = this.id
      this.$router.push({
        name: `seecourse`,
        params: { userId },
      })
    },

    modifyRole() {
      const userId = this.id
      this.$router.push({
        name: 'modifyrole',
        params: { userId },
      })
    },

    async deleteUser() {
      const userId = this.id
      try {
        if (
          confirm(
            `Êtes-vous sûr de vouloir supprimer l'utilisateur ${this.completeName} ?`
          )
        ) {
          await this.$axios.delete(
            `http://localhost:3000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('auth.token')}`,
              },
            }
          )
          this.$router.push({
            path: '/admin/adminusers',
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
