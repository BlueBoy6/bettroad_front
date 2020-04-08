<template>
  <div class="futureGames__container mb-5">
    <h2 class="headline mb-3">
      Prochains matchs
    </h2>
    <v-row :key="game.id" v-for="game in games.futureGames">
      <v-sheet class="game__vignet" :class="[spaceInside, colorBackgroundLight, darkText, 'mb-3']">
        <p class="subtitle-1 mb-0">
          <span>{{ game.city }}</span> -
          <span>Journée {{ game.day.dayNumber }}</span>
        </p>
        <p class="headline font-weight-bold mb-1">{{ game.day.fr }}</p>
        <div class="game__vignet__betslist__container">
          <div :key="bet.id" v-for="bet in game.betslist" >
            <v-row>
              <div class="chips mb-2">
                {{bet.label}}
                <div class="bets__modifier">
                  <v-btn to="/dashboard" small class="danger">
                    <v-icon x-small dark>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn to="/dashboard" small>
                    <v-icon x-small dark>mdi-lead-pencil</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-row>
          </div>
        </div>
      </v-sheet>
    </v-row>
  </div>
</template>

<script>
import {
  colorBtn,
  spaceInside, 
  colorBackgroundLight, 
  darkText
} from '@/style/colors.vars';
  export default {
    props: {
      games: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        colorBtn,
        spaceInside, 
        colorBackgroundLight, 
        darkText
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>