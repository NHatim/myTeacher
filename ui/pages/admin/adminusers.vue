<template>
  <div>
    <v-row class="rowstudent">
      <Student
        v-for="user in users"
        :id="user.id"
        :key="user.id"
        class="col-md-2"
        :complete-name="user.completeName"
        :see-role=true
        :see-course=true
        :email="user.email"
        :role="user.role"
        :see-student=false
        :can-modify="true"
        :see-presence="false"
      />
    </v-row>
  </div>
</template>

<script>
export default{
  data() {
    return {
      users: [],
    }
  },

  mounted() {
    this.getUsers();

  },

  methods: {
    async getUsers() {
      const response = await this.$axios.get('/users/', {
        headers: {
              Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
        },
      });
      this.users = response.data;
          console.log(this.users);
    },

    deleteUser(id) {

    }
  },
}
</script>

<style>
.rowstudent{
  margin: 2em;
}

</style>
