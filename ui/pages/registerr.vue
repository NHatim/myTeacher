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
            <v-date-picker
            v-model="birthDay"
            label="Date de naissance"
            hint="13/07/1993"
            title="Date de naissance"
            required></v-date-picker>
          </v-col>
          <v-col cols="12" md="4">
            <v-container fluid>
              <p>Êtes-vous un ?</p>
              <v-radio-group v-model="radios" mandatory>
                <v-radio label="Enseignant" value="TEACHER"></v-radio>
                <v-radio label="Étudiant" value="STUDENT"></v-radio>
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
