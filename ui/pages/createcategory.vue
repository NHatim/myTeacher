<template>
  <div>
    <v-card-title> Formulaire de création d'une catégorie </v-card-title>
    <v-col cols="12" md="4">
      <v-text-field
        v-model="name"
        label="Nom de la catégorie"
        :rules="[
          (v) =>
            !!v ||
            'Veuillez entrer le nom de la catégorie que vous voulez créer',
        ]"
        required
      ></v-text-field>
                  <v-col cols="12" md="4">
              <v-btn
                color="primary"
                elevation="5"
                large
                class="mr-4 down"
                @click="createCategory"
                >Créer la catégorie</v-btn
              >
            </v-col>
    </v-col>

  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },

  methods: {
    createCategory() {
      this.$axios
        .post('/category', {
          name: this.name,
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
          },
        })
        .then(() => {
          this.$router.push('/teacher')
        })
    },
  },
}
</script>
