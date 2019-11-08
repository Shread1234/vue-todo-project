<template>
  <div>
    <v-app-bar color="orange">
      <v-toolbar-title>Overwatch Stats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="$router.push('/')" color="white">cancel</v-icon>
    </v-app-bar>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card raised
            ><v-card-title>Player Search</v-card-title>
            <div v-if="this.playerDetails.length < 1">
              <v-card-text
                ><v-form id="playerSearch" @submit.prevent="getPlayer">
                  <v-text-field
                    color="orange"
                    label="Player Name *case sensitive*"
                    name="player"
                    type="text"/>
                  <v-select
                    color="orange"
                    label="Player Region"
                    name="playerRegion"
                    :items="regions"/>
                  <v-text-field
                    color="orange"
                    label="Battle Net ID eg. #1234"
                    name="playerID"
                    type="number"
                /></v-form>
              </v-card-text>
              <v-spacer></v-spacer
              ><v-card-actions
                ><v-btn
                  :loading="this.loading"
                  type="submit"
                  form="playerSearch"
                  color="orange"
                  >Get Details</v-btn
                ></v-card-actions
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img :src="playerDetails.icon">
              <v-card-title>{{ playerDetails.Name }}</v-card-title>
            </v-img>
            <v-card-subtitle>Subtitle</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      loading: false,
      regions: ["EU", "US", "Asia"],
      playerDetails: [],
    };
  },
  methods: {
    getPlayer: async function(e) {
      this.loading = true;
      const playerName = e.target[0].value;
      const playerRegion = e.target[1].value;
      const playerID = e.target[2].value;

      try {
        const { data } = await axios.get(
          `https://ow-api.com/v1/stats/pc/${playerRegion}/${playerName}-${playerID}/profile`,
        );
        this.loading = false;
        this.playerDetails = data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
