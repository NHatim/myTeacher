<template>
  <div>
    <v-row>
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img height="250" :src="image"></v-img>

        <v-card-title>{{ title }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">4.5 (413)</div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            € {{ price }} • {{ categoryName }}
          </div>

          <div>
            Description : {{ description }} <br />
            Nombre de places disponible : {{ places }}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title> Date de début : {{ startDate }}</v-card-title>
                <v-card-text>
          <div>
            Heure de début : {{ startHour }} <br />
            Heure de fin : {{ endHour }}
          </div>
          </v-card-text>
        <v-card-actions>
          <v-btn  color="deep-purple lighten-2" text @click="reserve">
            {{ buttonText }}
          </v-btn>
            <v-btn v-if="deleteButton" color="deep-purple lighten-2" text @click="reserve">
            {{ buttonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CoursePost',
  props: {
    image: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    },
    title: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    categoryName: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    places: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
    startHour: {
      type: String,
      default: '',
    },
    endHour: {
      type: String,
      default: '',
    },
    deleteButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    reserve() {
      const courseId = this.id
      this.$router.push({
        name: 'checkout',
        params: { courseId },
        component: 'CoursePost',
      })
    },

    deleteCourse(){
      const courseId = this.id
      this.$axios.delete(`/courses/${courseId}`)
      this.$router.push({
        name: 'yourcourses',
        component: 'CoursePost',
      })
    },
  },
}
</script>

