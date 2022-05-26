<template>
  <div>
    <v-row>
      <v-card v-for="payment in payments" :key="payment.id" class="mx-auto" max-width="344">
        <v-card-text>
          <div>Paiement numéro : {{ payment.id }}</div>
          <p class="text-h4 text--primary">{{ payment.author.completeName }}</p>
          <p>Montant à verser : {{ payment.course.price - 50}} €</p>
          <div class="text--primary">
            Sur le compte IBAN :<br />
            {{ payment.author.IBAN }}
          </div>
          <v-divider></v-divider>
          <div class="text--primary">Statut du paiement : {{payment.paidbyadmin ? "Payé" : "En attente" }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="deep-red accent-4" @click="pay(payment.id)"> Payer </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payments: [],
    }
  },

  mounted() {
    this.getReservationCourse()
  },
  methods: {
    async getReservationCourse() {
      const responses = await this.$axios.get('/reservation-course/all', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
        },
      })

      for(const response of responses.data) {
        const author = await this.$axios.get('/users/userid/' + response.course.authorId, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
          },
        })
        response.author = author.data
        this.payments.push(response)
      }
      console.log(this.payments)
    },

    async pay(id){
      const response = await this.$axios.put('/reservation-course/pay/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('auth.token'),
        },
      })
      console.log(id)
      console.log(response)
      this.$router.go()
    }
  },
}
</script>
