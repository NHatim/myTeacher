<template>
  <div>
    <v-row class="rowstudent">
      <Student
        v-for="student in students"
        :id="student.userId"
        :key="student.userId"
        class="col-md-4"
        :course-id="$router.currentRoute.params.courseId"
        :complete-name="student.user.completeName"
        :email="student.user.email"
        :present="student.attended ? 'PRESENT' : 'PAS ENCORE DE PRÉSENCE'"
      />
    </v-row>
    <v-btn color="purple lighten-2" text class="button" @click="mailStudents">
      Communiquer avec tout les étudiants
    </v-btn>
  </div>
</template>

<script>
import Student from '~/components/Student.vue'
export default {
  components: { Student },
  data() {
    return {
      students: [],
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      this.$axios
        .get(
          `http://localhost:3000/reservation-course/studentbycourse/${this.$router.currentRoute.params.courseId}`,
          {
            params: {
              id: Number(this.$router.currentRoute.params.courseId),
            },
          }
        )
        .then(({ data }) => {
          this.students = data
        })
    },
    mailStudents() {
      const userId = Number(
        localStorage.getItem('auth.profile').split(',')[0].split(':')[1]
      )
      const courseId = Number(this.$router.currentRoute.params.courseId)
      this.$router.push({
        name: 'contactstudents',
        params: { userId, courseId },
      })
    },
  },
}
</script>

<style>
.rowstudent {
  margin-top: 2em;
  margin-left: 2em;
}

.button {
  margin-left: 2.5em;
  margin-top: 2em;
}
</style>
