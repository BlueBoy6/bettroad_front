
<template>
  <div>
    <p class="display-1 mb-5" :class="[whiteText]">Prochain match</p>
    <v-card class="display-1 event__card" :class="[spaceInside, colorBackgroundLight, darkText]">
      <p class="subtitle-1 mb-0">
        <!-- <v-icon :color="colorBackgroundDark">mdi-map-marker-radius</v-icon> -->
        <span class="ml-2">{{ game.city }}</span>
      </p>
      <p class="headline font-weight-bold">{{ game.day.fr }}</p>
      <v-row>
        <v-col>
          <v-card
            v-bind:key="bet.name"
            v-for="bet in game.betstypes"
            class="ma-1 pa-3 subtitle-1 bets__available"
            :class="[cardBetsState, whiteText]"
            elevation="5"
            width="100%"
          >{{ bet.name }}</v-card>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn
            v-if="this.$store.state.betNextGameStatus !== 'OK'"
            :class="colorBtn"
            @click="nextGameOverlay = true"
            large
            float-right
          >Paris-là !</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-overlay :absolute="false" :opacity="1" :value="nextGameOverlay" :z-index="99">
      <v-container>
        <v-card width="100%" :class="[spaceInside, colorBackgroundLight, darkText]">
          <div
            class="headline font-weight-bold"
            :class="spaceInside"
            v-for="(bet,i) in game.betstypes"
            v-bind:key="bet.name"
          >
            <p :class="darkText">{{bet.name}}</p>
            <BetSwitch
              :id="i"
              :type="bet.betstype_categorie"
              :idBet="bet.id"
              expanded
              @input="changeValueBet"
            />
          </div>
          <v-row :class="spaceInside">
            <v-col justify="center" align="center">
              <v-btn :color="colorBtn" @click="submitBet" large width="100%">Prends mon paris là !</v-btn>
              <br />
              <v-btn
                :color="colorBtn"
                @click="nextGameOverlay = false"
                width="100%"
                large
                text
              >Peut-être plus tard !</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {
  colorBackgroundLight,
  colorBackgroundDark,
  colorSuccess,
  colorBtn,
  whiteText,
  darkText,
  spaceInside
} from "../../sass/colors.vars";
import BetSwitch from "../atoms/betsSwitch";
// import { postBet } from "../../helpers/betsdata";
export default {
  components: {
    BetSwitch
  },
  props: {
    game: Object
  },
  data() {
    return {
      bet: {
        gameday: {
          id: this.game.id,
          date: this.game.day.en
        },
        bets: [
          {
            value: null,
            idBet: null,
            idType: null
          },
          {
            value: null,
            idBet: null,
            idType: null
          }
        ]
      },
      nextGameOverlay: false,
      colorBackgroundLight,
      colorBackgroundDark,
      whiteText,
      darkText,
      spaceInside,
      colorBtn,
      colorSuccess
    };
  },
  beforeMount() {
    if (localStorage.getItem(`betnextgame${this.game.id}`) === "OK") {
      this.$store.commit("betnextgamestatus", "OK");
    }
  },
  methods: {
    changeValueBet: function(e) {
      this.bet.bets[e.id].value = e.value;
      this.bet.bets[e.id].idBet = e.idBet;
      this.bet.bets[e.id].idType = e.type.id;
    },
    submitBet: function() {
      const betToSubmit = this.bet;
      this.$store.commit("postBetPlayer", betToSubmit);
      this.nextGameOverlay = false;
    }
  },
  computed: {
    cardBetsState: function() {
      console.log("status : ", this.$store.state.betNextGameStatus);
      if (this.$store.state.betNextGameStatus === "OK") {
        return colorSuccess;
      }
      return colorBackgroundDark;
    }
  }
};
</script>

<style>
</style>