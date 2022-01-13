<template>
  <div>
    <div v-if="savingSuccessful" class="success">
      {{ text }}
    </div>
    <h1>Formulaire d'enregistrement</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              label="Prénom"
              :rules="[(v) => !!v || 'Veuillez entrer votre prénom']"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="[(v) => !!v || 'Veuillez entrer votre nom']"
              label="Nom"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.password]"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="Minimum 8 caractères"
              value=""
              class="input-group--focused"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              :append-icon="
                showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.passwordConfirmation]"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              name="passwordConfirmation"
              label="Password"
              hint="Minimum 8 caractères"
              value=""
              class="input-group--focused"
              @click:append="
                showPasswordConfirmation = !showPasswordConfirmation
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="phone"
              :rules="[
                (v) => !!v || 'Veuillez entrer votre numéro de téléphone',
              ]"
              :counter="12"
              hint="Exemple: +32 478 123 456"
              label="Téléphone"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="address"
              :rules="[(v) => !!v || 'Veuillez entrer votre adresse']"
              label="Addresse, Ville, Code Postal"
              hint="Exemple: Rue Gatti de Gamond 13, Uccle, 1180"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
            v-model="city"
            :rules="[(v) => !!v || 'Veuillez entrer votre ville']"
            label="Région"
            hint="Bruxelles-Capitale"
            required></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-container fluid>
              <p>Êtes-vous un ?</p>
              <v-radio-group v-model="radios" mandatory>
                <v-radio label="Enseignant" value="teacher"></v-radio>
                <v-radio label="Étudiant" value="student"></v-radio>
              </v-radio-group>
            </v-container>
          </v-col>

          <v-col cols="12" md="4">
            <v-btn
              color="primary"
              elevation="5"
              large
              class="mr-4"
              @click="save"
              >S'enregistrer</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || 'Veuillez entrer votre email',
        (v) => /.+@.+\..+/.test(v) || 'Veuillez entrer un email valide',
      ],
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      phone: '',
      address: '',
      city: '',
      radios: '',
      showPassword: false,
      showPasswordConfirmation: false,
      text: 'Vous avez réussi à vous enregistrer !',
      savingSuccessful: false,
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
        min: (v) => v.length >= 8 || 'Votre mot de passe doit contenir au moins 8 caractères',
        password: (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          ) ||
          'Votre mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial',
          passwordConfirmation: (v) =>
            v === this.password || 'Les mots de passe ne correspondent pas',

      },
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      const user = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          phone: this.phone,
          address: this.address,
          city: this.city,
          radios: this.radios,
      }
      this.$axios.$post('http://localhost:3001/members', user)
      .then(response => {
        alert(response)
        this.text = 'Vous avez réussi à vous enregistrer !'
        this.savingSuccessful = true
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)

      }).catch(error => {
        alert(error)
        this.text = 'Une erreur est survenue lors de l\'enregistrement'
        this.savingSuccessful = false
      })
    },
  },
}
</script>

<style scoped>
.success {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
