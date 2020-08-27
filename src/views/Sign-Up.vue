<template>
  <v-content>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card raised>
            <v-toolbar color="orange" flat>
              <v-toolbar-title>Create Account</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form id="signUpForm" @submit.prevent="signUp">
                <v-text-field
                  color="orange"
                  id="email"
                  label="Email Address"
                  name="email"
                  append-icon="mail"
                  type="email"
                />
                <v-text-field
                  color="orange"
                  id="confirmEmail"
                  label="Confirm Email Address"
                  name="confirmEmail"
                  type="email"
                />
                <v-text-field
                  color="orange"
                  id="password"
                  label="Password"
                  name="password"
                  append-icon="lock"
                  type="password"
                />
                <v-text-field
                  color="orange"
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
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
                color="orange"
                :loading="loading"
                :disabled="this.formIncomplete"
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
      emailAddressValue: "",
      confirmedEmailAddressValue: "",
      passwordValue: "",
      confirmedPasswordValue: "",
      formIncomplete: true,
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
    formValidation: function() {
      if (
        this.emailAddressValue.length > 0 &&
        this.passwordValue.length > 0 &&
        this.validateStringMatch(
          this.emailAddressValue,
          this.confirmedEmailAddressValue,
        ) &&
        this.validateStringMatch(
          this.passwordValue,
          this.confirmedPasswordValue,
        )
      ) {
        this.formIncomplete = false;
      } else {
        this.formIncomplete = true;
        this.loading = false;
      }
    },
    validateStringMatch: function(string, matcher) {
      return string === matcher;
    },
    setEmailInput: function(e) {
      this.emailAddressValue = e;
      this.formValidation();
    },
    setPasswordInput: function(e) {
      this.passwordValue = e;
      this.formValidation();
    },
    setConfirmedEmailInput: function(e) {
      this.confirmedEmailAddressValue = e;
      this.formValidation();
    },
    setConfirmedPasswordInput: function(e) {
      this.confirmedPasswordValue = e;
      this.formValidation();
    },
  },
};
</script>
