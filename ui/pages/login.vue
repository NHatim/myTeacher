<template>
  <div>
    <v-app id="inspire">
      <v-main>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Formulaire de login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="username"
                      prepend-icon="mdi-account-circle"
                      name="login"
                      label="Login"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      v-model="password"
                      prepend-icon="mdi-form-textbox-password"
                      name="password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { username: this.username, password: this.password },
        })
        this.$auth.loginWith('local', {
          data: { username: this.username, password: this.password },
        })
        this.$auth.$storage.setState('token', response.data.access_token)
        this.$auth.$storage.setLocalStorage('token', response.data.access_token)
        const profile = await this.$axios.get('/profile', {
          headers: { Authorization: 'Bearer ' + response.data.access_token },
        })
        const user = await this.$axios.get(`/users/${profile.data.username}`, {
          headers: { Authorization: 'Bearer ' + response.data.access_token },
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, createdAt, updatedAt, ...userWithoutPassword } =
          user.data
        this.$auth.$storage.setUniversal('profile', userWithoutPassword)
        window.location.replace('/')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #eee;
}
</style>
