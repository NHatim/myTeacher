<template>
  <div class="form">
    <v-alert
      v-if="alert"
      v-model="alert"
      dense
      elevation="2"
      dismissible
      type="error"
    >
      <strong>Des cours ne peuvent pas se donner en même temps</strong>
    </v-alert>
    <h1>Formulaire de création de cours</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="title"
              :value="title"
              label="Titre"
              :rules="[(v) => !!v || 'Veuillez entrer votre titre']"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="description"
              :value="description"
              :rules="[(v) => !!v || 'Veuillez entrer votre description']"
              label="Description"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="price"
              :value="price"
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
              :value="address"
              :rules="[(v) => !!v || 'Veuillez entrer le lieu de votre cours']"
              label="Lieu"
              hint="Exemple: Rue Gatti de Gamond 13, Uccle, 1180"
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
              v-model="placesMax"
              :rules="[(v) => !!v || 'Veuillez entrer le nombre de places']"
              required
              :value="placesMax"
              label="Nombre de places disponibles"
              thumb-label="always"
              class="v-slider"
              max="20"
              min="1"
            ></v-slider>
          </v-col>
          <v-col cols="12" md="8">
            <div>
              <v-card-title>
                <v-icon large left> mdi-calendar-month </v-icon>
                <span class="text-h6 font-weight-light">Date de de cours</span>
              </v-card-title>
              <component
                :is="component"
                v-for="(component, index) in components"
                :key="index"
                ref="component"
              />
              <v-row>
                <v-col cols="8" md="5">
                  <v-btn
                    color="red"
                    elevation="5"
                    large
                    class="mr-2 down"
                    @click="remove"
                  >
                    >Supprimer une date de cours</v-btn
                  >
                  <v-btn
                    color="primary"
                    elevation="5"
                    large
                    class="mr-4 down"
                    @click="addCourseDate"
                    >Rajouter une date de cours</v-btn
                  >
                </v-col></v-row
              >
            </div>
          </v-col>
          <v-row>
            <v-col cols="8" md="6">
              <v-card-title>
                <v-icon large left> mdi-file-image </v-icon>
                <span class="text-h6 font-weight-light"
                  >Image pour le cours</span
                >
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
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import DateCourse from '../components/DateCourse.vue'
export default {
  components: {
    DateCourse,
  },
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
      components: [DateCourse],
      address: '',
      alert: false,
      data: [],
      dateHour: [],
      title: '',
      description: '',
      price: '',
      placesMax: '',
      image: [],
      categories: [],
      categoryId: '',
      savingSuccessful: true,
      rules: {
        required: (value) => !!value || 'Ce champ est requis',
      },
    }
  },
  mounted() {
    this.getCategories()
    this.getCourse()
  },
  methods: {
    setCategory(category) {
      this.categoryId = category
    },

    async saveCourse() {
      this.$refs.component.forEach((component) => {
        this.dateHour.push(
          component.date + ' ' + component.startHour + ' ' + component.endHour
        )
      })
      if (this.checkIfDuplicateExists(this.dateHour)) {
        this.alert = true
        this.dateHour = []
        return
      }
      const formData = new FormData()
      formData.append(
        'authorId',
        parseInt(
          localStorage.getItem('auth.profile').split(',')[0].split(':')[1]
        )
      )
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('placesMax', Number(this.placesMax))
      formData.append('dateHour', this.dateHour)
      formData.append('categoryId', Number(this.categoryId))
      formData.append('price', Number(this.price))
      formData.append('address', this.address)
      formData.append('image', this.image)
      formData.forEach((value, key) => {
        if (!value) {
          this.savingSuccessful = false
          console.log(value, key)
        }
      })
      if (this.savingSuccessful) {
        try {
          await this.$axios.put(`/courses/modify/${this.$router.currentRoute.params.courseId}`, formData, {
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
    async getCourse() {
      const course = await this.$axios.get(
        `http://localhost:3000/courses/${this.$router.currentRoute.params.courseId}/course`,
        {
          params: {
            id: Number(this.$router.currentRoute.params.courseId),
          },
        }
      )
      this.title = course.data.title
      this.description = course.data.description
      this.price = course.data.price
      this.placesMax = course.data.placesMax
      this.address = course.data.address
      this.categoryId = course.data.categoryId
      this.dateHour = course.data.dateHour

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
        `/users/${
          localStorage.getItem('auth.profile').split('email')[1].split('"')[2]
        }`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
          },
        }
      )
      this.address = response.address
    },
    addCourseDate() {
      this.components.push(DateCourse)
    },
    checkIfDuplicateExists(arr) {
      return new Set(arr).size !== arr.length
    },
    remove() {
      if (this.components.length > 1) {
        this.components.pop()
      } else {
        alert('Vous ne pouvez pas supprimer le dernier cours')
      }
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
