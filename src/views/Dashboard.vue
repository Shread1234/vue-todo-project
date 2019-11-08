<template>
  <div>
    <v-app-bar color="orange">
      <v-toolbar-title>Overwatch Stats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="$router.push('/')"
        >Logout
        <v-icon right color="white">backspace</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card raised
            ><v-card-title>Player Search</v-card-title>
            <div v-if="!this.playerDetails">
              <v-card-text
                ><v-form id="playerSearch" @submit.prevent="getPlayer">
                  <v-text-field
                    color="orange"
                    label="Player Name"
                    hint="*Case Sensitive*"
                    name="player"
                    type="text"/>
                  <v-select
                    append-icon="arrow_drop_down"
                    dense
                    label="Player Region"
                    name="playerRegion"
                    color="orange"
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
    <v-container v-if="this.playerDetails" class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img :src="this.playerDetails.icon" />
            <v-card-title>{{ playerDetails.name }}</v-card-title>
            <div id="playerFrame">
              <v-img :src="this.playerDetails.prestigeIcon" />
              <v-img :src="this.playerDetails.levelIcon" />
              <v-img position="bottom" :src="this.playerDetails.ratingIcon" />
            </div>
            <p>{{ this.playerDetails.rating }}</p>
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
      playerDetails: null,
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

<style scoped>
#playerFrame {
}
</style>
