<template>
  <v-expansion-panel :class="[goodResultOrNot]" dark="false">
    <v-expansion-panel-header>{{bet.label}}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-sheet
            v-if="bet.result"
            :class="[colorBackgroundLight, darkText, spaceInside]"
          >Résultat juste : {{bet.result.name ? bet.result.name : bet.result }}</v-sheet>
          <v-sheet
            v-else
            :class="[colorBackgroundLight, darkText, spaceInside]"
          >Aucun résultat renseigné. 😴</v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            v-if="betSubmited !== null"
            :class="[colorBackgroundLight, darkText, spaceInside]"
          >Ton paris : {{betSubmited.result.name ? betSubmited.result.name : betSubmited.result }}</v-sheet>
          <v-sheet
            v-else
            :class="[colorErrorModal, whiteText, spaceInside]"
          >Hé con, t'as pas parié là ! 👎</v-sheet>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
/* eslint-disable no-console */
import {
  colorBackgroundLight,
  colorBackgroundDark,
  colorErrorModal,
  colorSuccess,
  // colorBtn,
  darkText,
  spaceInside,
  whiteText
} from "../../style/colors.vars";
export default {
  props: {
    bet: Object,
    betSubmited: Object
  },
  data() {
    return {
      colorBackgroundLight,
      colorBackgroundDark,
      spaceInside,
      whiteText,
      colorSuccess,
      colorErrorModal,
      darkText
    };
  },
  computed: {
    goodResultOrNot: function() {
      if (this.betSubmited !== null) {
        if (this.bet.result === this.betSubmited.result) {
          return this.colorSuccess;
        }
        return colorErrorModal;
      }
      return this.colorBackgroundDark;
    }
  }
};
</script>

<style>
</style>