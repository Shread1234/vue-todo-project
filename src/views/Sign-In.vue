<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form id="loginForm" @submit.prevent="signIn">
                <v-text-field
                  label="Email Address"
                  name="email"
                  append-icon="person"
                  type="email"
                  autocomplete="current-email"
                />
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  append-icon="lock"
                  type="password"
                  autocomplete="current-password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="$router.push('signup')" color="secondary"
                >Sign Up</v-btn
              >
              <v-spacer />
              <v-btn form="loginForm" type="submit" color="primary"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { firebaseSignIn } from "../utils/firebase";

export default {
  name: "SignIn",
  data() {
    return {
      signedInUser: null,
    };
  },
  methods: {
    signIn: async function(e) {
      const email = e.target[0].value;
      const password = e.target[1].value;

      try {
        const userData = await firebaseSignIn(email, password);
        this.signedInUser = userData;
        this.$router.push("dashboard");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
