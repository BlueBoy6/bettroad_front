<template>
  <div class="futureGames__container mb-5">
    <h2 class="headline mb-3">
      Prochains matchs
    </h2>
    <v-row :key="game.id" v-for="game in futureGames">
      <FutureGameVignet :game="game" />
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {
  colorBtn,
  spaceInside, 
  colorBackgroundLight, 
  darkText
} from '@/style/colors.vars';
import categorieSwitcher from '@/helpers/betCategoriesSwitcher';
import FutureGameVignet from './FutureGameVignet';
import { mapState } from 'vuex';
  export default {
    components: {
      FutureGameVignet,
    },
    props: {
      futureGames: {
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
        newBets: [{ value: '', category: 0 }],
      }
    },
    computed: {
      ...mapState({
        _betsCategories: state => state.moderation.betsCategories,
      })
    },
    methods: {
      
      categorieSwitch(switchValue){
        return categorieSwitcher(switchValue)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>