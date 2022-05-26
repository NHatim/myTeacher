<template>
  <div>
    <v-col class="d-flex" cols="12" sm="2">
      <v-select
        :items="roles"
        label="Différents rôles"
        dense
        outlined
        @input="setRole"
      ></v-select>
    </v-col>
    <v-btn class="primary btn-role" @click="changeRole"
      >Changer le rôle de cet utilisateur</v-btn
    >
  </div>
</template>

<script>

export default {
  data() {
    return {
      roles: [
        { text: 'Administrateur', value: 'ADMIN' },
        { text: 'Professeur', value: 'TEACHER' },
        { text: 'Étudiant', value: 'STUDENT' },
      ],
      role: '',
    }
  },
  methods: {
    async changeRole(){
      await this.$axios.put(
        `/users/modify-role/${this.$router.currentRoute.params.userId}`,
        {
          role: this.role,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
          },
        },
      );

      this.$router.push({
        path: '/admin/adminusers',
      });
    },
    setRole(role){
      this.role = role;
    }
  },
}
</script>

<style>
.btn-role {
  margin-left: 1em;
}
</style>
