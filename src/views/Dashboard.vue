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
                  <br />
                  <v-select
                    append-icon="arrow_drop_down"
                    dense
                    label="Player Region"
                    name="playerRegion"
                    color="orange"
                    :items="regions"/>
                  <br />
                  <v-text-field
                    color="orange"
                    label="Battle Net ID eg. #1234"
                    name="playerID"
                    type="number"/>
                  <br
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
            <div id="playerUserSummary">
              <p id="playerUserName">{{ playerDetails.name }}</p>
              <p>player rank</p>
              <p>player prestige</p>
              <p>player comp rating</p>
            </div>
            <v-img :src="this.playerDetails.icon" id="avatar" />
            <div id="playerFrame">
              <v-tabs id="tabs">
                <v-tab>Tab 1</v-tab>
                <v-tab>Tab 2</v-tab>
              </v-tabs>
              <v-img id="pIcon" :src="this.playerDetails.prestigeIcon" />
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
#pIcon {
  padding: 0;
  margin: 0;
  width: 100px;
  height: 100px;
}

#avatar {
  width: 50%;
  height: 50%;
  margin: 0%;
}

#playerUserSummary {
  float: right;
  top: 0;
  padding-right: 15px;
  padding-bottom: 3px;
  margin: 0px;
  font-weight: 500;
}

#playerUserName {
  font-weight: 600;
  padding-top: 5px;
}

#tabs {
  left: 0;
  position: relative;
}
</style>
