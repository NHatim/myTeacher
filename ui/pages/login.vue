<template>
<div>
 <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              v-model="email"
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
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const response = await this.$axios.$get(`http://localhost:3001/members/finduser`, {
        params: {
          email :this.email.toLowerCase(),
          password : this.password
        },
      })
      console.log(response)

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
