<template>
  <div class="form">
    <h1>Formulaire de création de cours</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="title"
              label="Titre"
              :rules="[(v) => !!v || 'Veuillez entrer votre titre']"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="description"
              :rules="[(v) => !!v || 'Veuillez entrer votre description']"
              label="Description"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="price"
              label="Prix"
              hint="13.99"
              :rules="priceRules"
              prefix="€"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="address"
              :rules="[(v) => !!v || 'Veuillez entrer le lieu de votre cours']"
              label="Lieu"
              hint="Exemple: Rue Gatti de Gamond 13, Uccle, 1180"
              :value="address"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              :items="categories"
              label="Catégorie"
              @input="setCategory"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-slider
              v-model="places"
              label="Nombre de places disponibles"
              thumb-label="always"
              class="v-slider"
              max="20"
              min="1"
            ></v-slider>
          </v-col>
          <v-col cols="12" md="3">
            <v-card-title>
              <v-icon large left> mdi-calendar-month </v-icon>
              <span class="text-h6 font-weight-light"
                >Date de début du cours</span
              >
            </v-card-title>
            <v-date-picker
              v-model="startDate"
              label="Date de début"
              required
              title="Date de début"
              locale="fr"
            ></v-date-picker>
          </v-col>

          <v-col cols="11" sm="2">
            <v-menu
              ref="menuBeginning"
              v-model="menuBeginning"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="startHour"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startHour"
                  label="Heure de début"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuBeginning"
                v-model="startHour"
                format="24hr"
                full-width
                @click:minute="$refs.menuBeginning.save(startHour)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="11" sm="2">
            <v-menu
              ref="menuEnd"
              v-model="menuEnd"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="endHour"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endHour"
                  label="Heure de début"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuEnd"
                v-model="endHour"
                format="24hr"
                full-width
                @click:minute="$refs.menuEnd.save(endHour)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="4">
            <v-card-title>
              <v-icon large left> mdi-file-image </v-icon>
              <span class="text-h6 font-weight-light">Image pour le cours</span>
            </v-card-title>
            <client-only>
              <v-file-input
                v-model="image"
                color="deep-purple accent-4"
                counter
                label="Ajouter une image"
                accept="image/*"
                placeholder="Sélectionner le(s) image(s)"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="text-overline grey--text text--darken-3 mx-2"
                  >
                    +{{ images.length - 2 }} Image(s)
                  </span>
                </template>
              </v-file-input>
            </client-only>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              color="primary"
              elevation="5"
              large
              class="mr-4 down"
              @click="saveCourse"
              >Créer le cours</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  auth: 'guest',
  data() {
    return {
      emailRules: [
        (v) => !!v || 'Veuillez entrer votre email',
        (v) => /.+@.+\..+/.test(v) || 'Veuillez entrer un email valide',
      ],
      priceRules: [
        (v) =>
          /^[+-]?([0-9]*[.])?[0-9]+$/.test(v) ||
          'Veuillez entrer un prix valide',
        (v) => (v && v > 0) || 'Veuillez entrer un prix supérieur à 0',
        (v) => (v && v <= 50) || 'Veuillez entrer un prix inférieur à 50',
      ],
      address: '',
      startHour: '',
      endHour: '',
      title: '',
      description: '',
      price: '',
      places: '',
      startDate: '',
      image: [],
      categories: [],
      categoryId: '',
      savingSuccessful: true,
      menuBeginning: false,
      menuEnd: false,
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
        min: (v) =>
          v.length >= 8 ||
          'Votre mot de passe doit contenir au moins 8 caractères',
      },
    }
  },
  mounted() {
    this.getCategories()
    this.getUserAdress()
  },
  methods: {
    setCategory(category) {
      this.categoryId = category
    },
    async saveCourse() {
      const formData = new FormData()
      formData.append(
        'authorId',
        parseInt(
          localStorage.getItem('auth.profile').split(',')[0].split(':')[1]
        )
      )
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('places', Number(this.places))
      formData.append('startDate', this.startDate)
      formData.append('categoryId', Number(this.categoryId))
      formData.append('price', Number(this.price))
      formData.append('address', this.address)
      formData.append('image', this.image)
      formData.append('startHour', this.startHour)
      formData.append('endHour', this.endHour)
      formData.forEach((value, key) => {
        if (!value) {
          this.savingSuccessful = false
          console.log(value, key)
        }
      })
      if (this.savingSuccessful) {
        try {
          await this.$axios.post('/courses', formData, {
            headers: {
              'Content-Type':
                'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
              Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
            },
          })
          this.$router.push('/yourcourses')
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('Veuillez remplir tous les champs')
      }
    },
    async getCategories() {
      const response = await this.$axios.$get('/category')
      response.forEach((category) => {
        this.categories.push({
          text: category.name,
          value: category.id,
        })
      })
    },
    async getUserAdress() {
      const response = await this.$axios.$get(
        `/users/${localStorage.getItem('auth.profile').split(',')[0].split(':')[1]}`
      )
      this.address = response.address
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

.down {
  margin-top: 6em;
  margin-left: 1em;
}

.v-slider {
  margin-top: 2em;
}

.form {
  margin: 1em;
}
</style>
