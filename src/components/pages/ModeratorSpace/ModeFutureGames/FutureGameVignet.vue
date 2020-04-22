<template>
  <v-sheet class="game__vignet" :class="[spaceInside, colorBackgroundLight, darkText, 'mb-3']">
    <p class="subtitle-1 mb-0">
      <span>{{ game.city }}</span>
      <DatePicker v-model="game.day" :class="{'mb-5': !isNextGame, 'mb-0': isNextGame}"/>
    </p>
    <!-- <p class="headline font-weight-bold" @click="dateToggle" :class="{'mb-5': !isNextGame, 'mb-0': isNextGame}">{{ game.day.fr }}</p> -->
    <p class="subtitle-1 mb-5 teal--text text--darken-1" v-if="isNextGame">Prochaine journée de paris</p>
    <div class="game__vignet__betslist__container">
      <div :key="bet.id" v-for="bet in game.betslist" >
        <div class="chips mb-2">
          {{ bet.label }} - {{ categorieSwitch(bet.__component) }}
          <div class="bets__modifier">
            <v-btn to="/dashboard" small class="danger">
              <v-icon x-small dark>mdi-delete</v-icon>
            </v-btn>
            <v-btn to="/dashboard" small>
              <v-icon x-small dark>mdi-lead-pencil</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="bett__add mt-5">
        <div v-for="(newBet, i) in newBets"
            :key="i"
            >
          <v-btn-toggle
            v-model="newBets[i].category"
            class="mb-2"
            mandatory
          >
            <v-btn :key="option.uid" v-for="option in _betsCategories" small>
              <v-icon></v-icon> {{ option.name }} 
            </v-btn>
          </v-btn-toggle>
          <v-text-field
            label="Ajouter un titre de paris" 
            :append-icon="i === newBets.length -1 ? 'mdi-plus' : ''"
            @click:append="addBett"
            v-model="newBets[i].value"
            light
            outlined 
            dense
            />
        </div>
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
import DatePicker from '@/components/molecules/DatePicker.vue';
import { mapState } from 'vuex';
import categorieSwitcher from '@/helpers/betCategoriesSwitcher';
  export default {
    components: {
      DatePicker,
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
        newBets: [{ value: '', category: 0 }],
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
      addBett() {
        return this.newBets.push({ value: '', category: 0 });
      },
      categorieSwitch(switchValue){
        return categorieSwitcher(switchValue)
      }
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