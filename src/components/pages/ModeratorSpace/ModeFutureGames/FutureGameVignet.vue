<template>
  <v-sheet class="game__vignet" :class="[spaceInside, colorBackgroundLight, darkText, 'mb-3']">
    <p class="subtitle-1 mb-0">
      <span>{{ game.city }}</span>
      <DatePicker v-model="game.day" :class="{'mb-5': !isNextGame, 'mb-0': isNextGame}"/>
    </p>
    <!-- <p class="headline font-weight-bold" @click="dateToggle" :class="{'mb-5': !isNextGame, 'mb-0': isNextGame}">{{ game.day.fr }}</p> -->
    <p class="subtitle-1 mb-5 teal--text text--darken-1" v-if="isNextGame">Prochaine journée de paris</p>
    <div class="game__vignet__betslist__container">
      <div class="bett__add mt-5">
        <BetModifier 
          v-for="(bet, i) in betsList" 
          :key="i" 
          :bet="bet"
          :createNewPicto="i === betsList.length-1"
          @createNewBet="createNewBet"
          :option="categorieSwitch(bet.__component)" 
          :categories="_betsCategories"
          @saveInput="saveBet" />
        <v-btn @click="() => saveModification">Sauvegarder</v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
/* eslint-disable no-console */
import {
  colorBtn,
  spaceInside, 
  colorBackgroundLight, 
  darkText,
  colorSuccess
} from '@/style/colors.vars';
import BetModifier from './betModifier.vue'
import DatePicker from '@/components/molecules/DatePicker.vue';
import { mapState } from 'vuex';
import categorieSwitcher from '@/helpers/betCategoriesSwitcher';
  export default {
    components: {
      DatePicker,
      BetModifier
    },
    props: {
      game: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        colorBtn,
        spaceInside, 
        colorBackgroundLight, 
        darkText,
        colorSuccess,
        picker: this.game.day.en,
        dialog: false,
        betsList: this.game.betslist,
      }
    },
    computed: {
      ...mapState({
        _nextGame: state => state.gamedays.nextGame,
        _betsCategories: state => state.moderation.betsCategories,
      }),
      isNextGame(){
        return this._nextGame.id === this.game.id;
      }
    },
    methods: {
      saveModification(){
        console.log('save', this.game.id)
      },
      createNewBet() {
        console.log('create new bet in parent : ')
        return this.betsList.push({id: Date.now(), result: null, value: '', category: this._betsCategories[0] });
      },
      categorieSwitch(switchValue){
        return categorieSwitcher(switchValue)
      },
      saveBet({id, betLabel, betsCategorie}){
        console.log('id', id) 
        console.log('betLabel', betLabel) 
        console.log('betsCategorie', betsCategorie) 
      }
    },
    updated () {
      console.log('betslist : ', this.betsList);
    },
  }
</script>

<style lang="scss" scoped>
.bett__add{
  width: 100%;
  .v-item-group{
    &.v-btn-toggle{
      .v-btn{
        min-height: 36px;
      }
    }
  }
}
</style>