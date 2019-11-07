<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Create Account</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form id="signUpForm" @submit.prevent="signUp">
                <v-text-field
                  id="email"
                  label="Email Address"
                  name="email"
                  append-icon="mail_outline"
                  type="email"
                />
                <v-text-field
                  id="confirmEmail"
                  label="Confirm Email Address"
                  name="confirmEmail"
                  append-icon="email"
                  type="email"
                />
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  append-icon="lock_outline"
                  type="password"
                />
                <v-text-field
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  append-icon="lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="$router.push('/')" color="secondary"
                >Back to Login</v-btn
              >
              <v-spacer />
              <v-btn
                type="submit"
                form="signUpForm"
                color="primary"
                :loading="loading"
                >Sign Up</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { firebaseSignUp } from "../utils/firebase";

export default {
  name: "SignUp",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    signUp: async function(e) {
      this.loading = true;
      const email = e.target[0].value;
      const password = e.target[2].value;
      try {
        const signUpUser = await firebaseSignUp(email, password);
        console.log(signUpUser);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
