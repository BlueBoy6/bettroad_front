<template>
  <v-container v-if="dataLoaded" class="dashboard">
    <v-row>
      <v-col cols="8" offset="2">
        <NextGame :game="gamedays.next" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="8" offset="2" class="loading">
        <v-progress-circular :size="130" :width="7" :color="colorBackgroundLight" indeterminate />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { getGameDays } from "../../helpers/calendar";
import { getBetsTypeCategories, getPlayersTeam } from "../../helpers/betsdata";
import {
  colorBackgroundLight,
  colorBackgroundDark,
  whiteText,
  darkText,
  spaceInside
} from "../../sass/colors.vars";
import NextGame from "../organisms/NextGame";
export default {
  components: {
    NextGame
  },
  data() {
    return {
      dataLoaded: false,
      gamedays: null,
      colorBackgroundLight,
      colorBackgroundDark,
      whiteText,
      darkText,
      spaceInside
    };
  },
  mounted: async function() {
    const token = this.$store.state.user.token;
    // console.log("store token to boot : ", !!token);
    if (token === undefined) {
      this.$router.push({
        path: "/"
      });
    }
    this.fetchGameDatas(token);
  },
  methods: {
    fetchGameDatas: async function(token) {
      const gamedaysdata = await getGameDays(token);
      const betsCategoriesData = await getBetsTypeCategories(token);
      const players = await getPlayersTeam(token);
      if (gamedaysdata) {
        this.$store.commit("storeBetsCategories", betsCategoriesData);
        this.$store.commit("storeTeamMates", players);
        this.$store.commit("storeGameDays", [betsCategoriesData, gamedaysdata]);
        if (this.$store.state.gamedays.next !== null) {
          this.gamedays = this.$store.state.gamedays;
          this.dataLoaded = true;
        }
      }
    }
  }
};
</script>

<style lang="scss">
// $card-adjacent-sibling-text-padding-top: 45px;
.container.dashboard {
  min-height: 100%;
  & > .row {
    min-height: 100%;
    .col.loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.v-card {
  .event__card {
    border-radius: 6px;
    text-align: left;
    p.headline {
      margin-bottom: 0px;
    }
    .bets__available {
      width: 100%;
      border-radius: 4px;
    }
  }
}
</style>
