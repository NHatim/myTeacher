<template>
  <div>
    <v-card-title>
      Formulaire de contact avec l'enseignant
    </v-card-title>
    <v-card-subtitle>
      Vous pouvez contacter l'enseignant en remplissant le formulaire ci-dessous
    </v-card-subtitle>


          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :value="email"
              label="Email de prise de contact"
              :rules="[(v) => !!v || 'Veuillez entrer votre email']"
              :maxlength="30"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="subject"
              label="Sujet"
              :rules="[(v) => !!v || 'Veuillez entrer le sujet']"
              :maxlength="30"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-textarea
              v-model="message"
              label="Message"
              color="teal"
              :rules="[(v) => !!v || 'Veuillez entrer le message']"
              :maxlength="250"
              required
            ></v-textarea>
          </v-col>
      <v-btn class="primary btnsend" @click="sendMessage">
        Envoyer le message
      </v-btn>
  </div>
</template>

<script>
export default{

  data() {
    return {
      subject: '',
      completeName: '',
      email:'',
      message:'',
      courseId : this.$router.currentRoute.params.courseId,
    }
  },
  async mounted() {
    this.email = await this.$axios.$get('/users/email/' + localStorage.getItem('auth.profile').split(',')[0].split(':')[1], {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
      },
    })
    this.completeName = await this.$axios.$get('/users/user/' + localStorage.getItem('auth.profile').split(',')[0].split(':')[1], {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
      },
    })
  },

  methods: {
    async sendMessage(){
      const response = await this.$axios.$post('/users/contact-teacher', {
        email: this.email,
        subject: this.subject,
        message: this.message,
        courseId: this.courseId,
        completeName: this.completeName,
      }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
      },
    })
      this.$router.push('/')

    }
  },
}
</script>

<style>
.btnsend{
  margin-left: 2em;
}
</style>
