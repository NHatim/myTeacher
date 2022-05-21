<template>

  <v-app dark>
    <script src="https://js.stripe.com/v3/"></script>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item router exact to="/">
          <v-list-item-action>
            <v-icon>{{ items[0].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[0].title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!connected" exact to="/register">
          <v-list-item-action>
            <v-icon>{{ items[1].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[1].title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!connected" router exact to="/login">
          <v-list-item-action>
            <v-icon>{{ items[2].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[2].title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.role === 'TEACHER'" router exact to="/teacher">
          <v-list-item-action>
            <v-icon>{{ items[3].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[3].title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="user.role === 'TEACHER'"
          router
          exact
          to="/yourcourses"
        >
          <v-list-item-action>
            <v-icon>{{ items[4].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[4].title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item router exact to="/courses">
          <v-list-item-action>
            <v-icon>{{ items[5].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[5].title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.role === 'STUDENT'" router exact to="/studentcourses">
          <v-list-item-action>
            <v-icon>{{ items[6].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="items[6].title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn v-if="user.email !== ''" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      {{ user.firstName }} {{ user.lastName }}
      <v-btn v-if="connected" icon @click.stop="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Accueil',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Enregistrez-vous',
          to: '/register',
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login',
        },
        {
          icon: 'mdi-school',
          title: 'Créer un cours',
          to: '/teacher',
        },
        {
          icon: 'mdi-school-outline',
          title: 'Vos Cours Créer',
          to: '/yourcourses',
        },
        {
          icon: 'mdi-library',
          title: 'Cours',
          to: '/courses',
        },
        {
          icon: 'mdi-book-education',
          title: 'Vos Cours Souscrit',
          to: '/studentcourses',
        },
      ],
      user: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
      },
      connected : false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'My Teacher',
    }
  },
  mounted() {
    if (this.$auth.$storage.getUniversal('profile')) {
      this.user.lastName = this.$auth.$storage.getUniversal('profile').completeName
      this.user.email = this.$auth.$storage.getUniversal('profile').email
      this.user.role = this.$auth.$storage.getUniversal('profile').role
      this.connected = true
    }
  },
  methods: {
    logout() {
      this.$auth.$storage.removeUniversal('profile')
      this.connected = false
      window.location.href = '/'
    },
  },
}
</script>
