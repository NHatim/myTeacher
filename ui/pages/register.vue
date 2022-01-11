<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            label="Prénom"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            label="Nom"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            value=""
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            name="passwordConfirmation"
            label="Password"
            hint="At least 8 characters"
            value=""
            class="input-group--focused"
            @click:append="showPasswordConfirmation = !showPasswordConfirmation"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="phone"
            :counter="10"
            label="Téléphone"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="address"
            label="Addresse"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="city" label="Ville" required></v-text-field>
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
          <v-btn color="primary" elevation="5" large class="mr-4" @click="save">S'enregistrer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
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
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  methods: {
      async save(e){
    e.preventDefault();
    await fetch("http://localhost:3001/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        city: this.city,
        radios: this.radios,
      }),
    }).then(res => res.json()).this.$router.push('/url-path');
  }
  },

}
</script>

<style>
</style>
