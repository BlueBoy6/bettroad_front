<template>
  <v-sheet class="mb-3" :class="[spaceInside, colorBackgroundLight, darkText]">
    <p class="subtitle-1 mb-0">
      <span>{{ game.city }}</span>
    </p>
    <p class="headline font-weight-bold mb-1">{{ game.day.fr }}</p>
    <p class="subtitle">{{percentOfSuccess >= 50 ? '🎯' : '🌧'}} {{percentOfSuccess}}% de réussite</p>
    <v-expansion-panels>
      <ExpansionPannelResult
        :betSubmited="game.betSubmited ? game.betSubmited[i] : null "
        :bet="bet"
        :key="i"
        v-for="(bet, i) in game.betslist"
      />
    </v-expansion-panels>
  </v-sheet>
</template>

<script>
/* eslint-disable no-console */
import ExpansionPannelResult from "./ExpansionPannelResult";
import {
  colorBackgroundLight,
  // colorBackgroundDark,
  // colorErrorModal,
  // colorSuccess,
  // colorBtn,
  darkText,
  spaceInside,
  whiteText
} from "../../style/colors.vars";
export default {
  components: {
    ExpansionPannelResult
  },
  props: {
    game: Object
  },
  data() {
    return {
      colorBackgroundLight,
      spaceInside,
      whiteText,
      darkText
    };
  },
  computed: {
    betlabel() {
      if (this.game.betSubmited) return;
      return this.game.betslist.label;
    },
    percentOfSuccess: function() {
      if (this.game.betSubmited) {
        const gamesBetsWin = this.game.betslist.filter((bet, i) => {
          return bet.result === this.game.betSubmited[i].result;
        });
        const percent = (gamesBetsWin.length / this.game.betslist.length) * 100;
        return percent;
      }
      return 0;
    }
  }
};
</script>

<style>
</style>