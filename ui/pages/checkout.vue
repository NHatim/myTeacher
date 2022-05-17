<template>
  <div>
    <v-row>
      <form id="payment-form">
        <div id="payment-element">
          <!--Stripe.js injects the Payment Element-->
        </div>
        <button id="submit">
          <div class="spinner hidden" id="spinner"></div>
          <span id="button-text">Payez maintenant {{ course.price }} €</span>
        </button>
        <div id="payment-message" class="hidden"></div>
      </form>
      <CoursePost
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :description="course.description"
        :price="course.price"
        :start-date="course.startDate"
        :places="course.places"
        :image="getImage(course.id)"
        :start-hour="course.startHour"
        :end-hour="course.endHour"
        class="col-md-4"
      />
    </v-row>
    <v-snackbar
      v-if="snackbar"
      :timeout="-1"
      :value="true"
      color="success"
      absolute
      right
      rounded="pill"
      top
    >
      Paiement Réussi !
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {
        price: 0,
        title: '',
        description: '',
        startDate: '',
        places: 0,
        id: Number(this.$router.currentRoute.params.courseId),
      },
      email: '',
      snackbar: false,
    }
  },
  async mounted() {
    const stripe = await Stripe(
      'pk_test_51Hc81TCVrndLB70qhJP3pJ6IyedjI1UVEc24de4n5QvZimnZRJiQy9z57ESbZiHAzWI5eyIxSO5uVpqaTvOOPYyj00QPa9SnIE'
    )

    this.email = localStorage
      .getItem('auth.profile')
      .split(',')[1]
      .split(':')[1]
      .replace(/"/g, '')
    const course = await this.$axios.get(
      `http://localhost:3000/courses/${this.$router.currentRoute.params.courseId}/course`,
      {
        params: {
          id: Number(this.$router.currentRoute.params.courseId),
        },
      }
    )
    this.course = course.data

    initialize()
    checkStatus()
    let elements
    document
      .querySelector('#payment-form')
      .addEventListener('submit', handleSubmit)
    let idPaymentIntent
    async function initialize() {
      const response = await fetch(
        'http://localhost:3000/reservation-course/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: course.data.id,
            userId: localStorage
              .getItem('auth.profile')
              .split(',')[0]
              .split(':')[1],
          }),
        }
      )
      const { clientSecret } = await response.json()
      idPaymentIntent = clientSecret

      const appearance = {
        theme: 'night',
      }

      elements = stripe.elements({ appearance, clientSecret })
      const paymentElement = elements.create('payment')
      paymentElement.mount('#payment-element')
    }
    async function handleSubmit(e) {
      e.preventDefault()
      setLoading(true)
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          receipt_email: 'hatim.naimi@gmail.com',
        },
        redirect: 'if_required',
      })
      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          showMessage(error.message)
        } else {
          showMessage('An unexpected error occured.')
        }
      }

      setLoading(false)
      await fetch(
        'http://localhost:3000/reservation-course/create-reservation-course',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: course.data.id,
            userId: localStorage
              .getItem('auth.profile')
              .split(',')[0]
              .split(':')[1],
            paymentIntentId: idPaymentIntent,
          }),
        }
      )
      snackbar = true
      setTimeout(() => {
        window.location.replace('/studentcourses')
      }, 2000)
    }

    async function checkStatus() {
      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      )

      if (!clientSecret) {
        return
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

      switch (paymentIntent.status) {
        case 'succeeded':
          showMessage('Payment succeeded!')
          console.log('Payment succeeded!')
          break
        case 'processing':
          showMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          showMessage('Your payment was not successful, please try again.')
          break
        default:
          showMessage('Something went wrong.')
          break
      }
    }

    // ------- UI helpers -------

    function showMessage(messageText) {
      const messageContainer = document.querySelector('#payment-message')

      messageContainer.classList.remove('hidden')
      messageContainer.textContent = messageText

      setTimeout(function () {
        messageContainer.classList.add('hidden')
        messageText.textContent = ''
      }, 4000)
    }

    // Show a spinner on payment submission
    function setLoading(isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector('#submit').disabled = true
        document.querySelector('#spinner').classList.remove('hidden')
        document.querySelector('#button-text').classList.add('hidden')
      } else {
        document.querySelector('#submit').disabled = false
        document.querySelector('#spinner').classList.add('hidden')
        document.querySelector('#button-text').classList.remove('hidden')
      }
    }
  },
  methods: {
    getImage(id) {
      return `http://localhost:3000/courses/${id}/image`
    },
  },
}
</script>

<style scoped>
/* Variables */
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
}

form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}

.hidden {
  display: none;
}

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}
button:hover {
  filter: contrast(115%);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
#email {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: white;
}
</style>
