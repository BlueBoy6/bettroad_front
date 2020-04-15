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
        <p class="headline font-weight-bold mb-5">{{ game.day.fr }}</p>
        <div class="game__vignet__betslist__container">
          <div :key="bet.id" v-for="bet in game.betslist" >
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
          </div>
          <div class="bett__add mt-5">
            <div v-for="(newBet, i) in newBets"
                :key="i" >
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
                label="Ajouter un paris" 
                :append-icon="i === newBets.length -1 && 'mdi-plus'"
                @click:append="addBett"
                v-model="newBets[i].value"
                light
                outlined 
                dense
                />
            </div>
          </div>
        </div>
      </v-sheet>
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
import { mapState } from 'vuex';
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
      addBett() {
        return this.newBets.push({ value: '', category: 0 });
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