<template>
  <v-sheet class="mb-3" :class="[spaceInside, colorBackgroundLight, darkText]">
    <p class="subtitle-1 mb-0">
      <span>{{ game.city }}</span>
    </p>
    <p class="headline font-weight-bold">{{ game.day.fr }}</p>
    <v-expansion-panels>
      <ExpansionPannelResult
        :betSubmited="game.submited ? game.betSubmited[i] : null "
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
    }
  }
};
</script>

<style>
</style>