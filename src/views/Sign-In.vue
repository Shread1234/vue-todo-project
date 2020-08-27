<template>
  <v-content>
    <v-container fluid>
      <v-row align="center" justify="center" fill-width>
        <v-col cols="12" sm="8" md="4">
          <v-card raised>
            <v-toolbar color="orange" flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form id="loginForm" @submit.prevent="signIn">
                <v-text-field
                  color="orange"
                  label="Email Address"
                  name="email"
                  append-icon="person"
                  type="email"
                  autocomplete="current-email"
                  @input="setEmailInput"
                  :error-messages="this.emailErrorMessage"
                />
                <v-text-field
                  color="orange"
                  id="password"
                  label="Password"
                  name="password"
                  append-icon="lock"
                  type="password"
                  autocomplete="current-password"
                  @input="setPasswordInput"
                  :error-messages="this.passwordErrorMessage"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="$router.push('signup')" color="secondary"
                >Sign Up</v-btn
              >
              <v-spacer />
              <v-btn
                :loading="this.loading"
                form="loginForm"
                type="submit"
                color="orange"
                :disabled="this.formIncomplete"
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
      loading: false,
      formIncomplete: true,
      emailAddressValue: "",
      passwordValue: "",
      emailErrorMessage: null,
      passwordErrorMessage: null,
    };
  },
  methods: {
    signIn: async function(e) {
      this.loading = true;
      const email = e.target[0].value;
      const password = e.target[1].value;

      try {
        this.emailErrorMessage = null;
        this.passwordErrorMessage = null;
        const userData = await firebaseSignIn(email, password);
        this.$router.push("dashboard");
      } catch ({ message }) {
        if (/password/.test(message)) {
          this.passwordErrorMessage = "Incorrect Password";
          this.passwordValue = "";
          this.formValidation();
        }

        if (/email/.test(message)) {
          this.emailErrorMessage = "Incorrect Email Format";
          this.emailAddressValue = "";
          this.formValidation();
        }

        if (/identifier/.test(message)) {
          this.emailErrorMessage = "Unknown Email Address";
          this.emailAddressValue = "";
          this.formValidation();
        }
      }
    },
    formValidation: function() {
      if (this.emailAddressValue.length > 0 && this.passwordValue.length > 0) {
        this.formIncomplete = false;
      } else {
        this.formIncomplete = true;
        this.loading = false;
      }
    },
    setEmailInput: function(e) {
      this.emailAddressValue = e;
      this.formValidation();
    },
    setPasswordInput: function(e) {
      this.passwordValue = e;
      this.formValidation();
    },
  },
};
</script>
