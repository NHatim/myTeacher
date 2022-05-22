<template>
  <div>
    <v-row class="rowstudent">
      <Student
        v-for="student in students"
        class="col-md-4"
        :id="student.userId"
        :key="student.userId"
        :course-id="$router.currentRoute.params.courseId"
        :complete-name="student.user.completeName"
        :email="student.user.email"
        :present="student.attended ? 'PRESENT' : 'PAS ENCORE DE PRÉSENCE'"
      />
      </v-row>
  </div>
</template>

<script>
import Student from '~/components/Student.vue'
export default {
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
  },
  components: { Student },
}
</script>

<style>
.rowstudent {
  margin-top: 2em;
  margin-left: 2em;
}

</style>
