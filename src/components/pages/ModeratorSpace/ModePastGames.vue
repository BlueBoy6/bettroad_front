<template>
  <div>
    <h2 class="headline mb-3">
      Matchs passés non modifiables
    </h2>
    <v-row :key="game.id" v-for="game in pastGames">
      <v-sheet class="game__vignet" :class="[spaceInside, colorBackgroundLight, darkText, 'mb-3']">
        <p class="subtitle-1 mb-0">
          <span>{{ game.city }}</span> -
          <span>Journée {{ game.day.dayNumber }}</span>
        </p>
        <p class="headline font-weight-bold mb-1">{{ game.day.fr }}</p>
        <div class="game__vignet__betslist__container">
          <div class="game__vignet__betslist__list" >
            <div v-for="bet in game.betslist" :key="bet.id" class="game__vignet__betslist__list__item" >
              {{bet.label}}
            </div>
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
      pastGames: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        colorBtn,
        spaceInside, 
        colorBackgroundLight, 
        darkText,
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>