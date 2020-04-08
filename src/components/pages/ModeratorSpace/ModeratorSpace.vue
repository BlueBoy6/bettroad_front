<template>
  <v-container class="moderator-space mt-12">
		<v-row justify="center">
			<v-col cols="12" md="8">
        <v-row>
          <h1 class="page-title mb-10">
            Espace de Modération
          </h1>
        </v-row>
        <v-row class="mb-10">
          <v-btn to="/dashboard" :class="colorBtn">
            Retour à l'espace de paris
          </v-btn>
        </v-row>
        <template v-if="dataLoaded">
          <v-row>
            <h2 class="display-1 mb-5">
              Journées de matchs
            </h2>
          </v-row>
          <v-row class="mb-3">
            <v-btn to="/dashboard" :class="colorBtn" x-large block>
              <v-icon small dark class="mr-2">mdi-calendar-plus</v-icon> Créer une nouvelle journée
            </v-btn>
          </v-row>
          <v-row :key="game.id" v-for="game in _games.allGames">
            <v-sheet class="game__vignet" :class="[spaceInside, colorBackgroundLight, darkText, 'mb-3']">
              <p class="subtitle-1 mb-0">
                <span>{{ game.city }}</span> -
                <span>Journée {{ game.day.dayNumber }}</span>
              </p>
              <p class="headline font-weight-bold mb-1">{{ game.day.fr }}</p>
              <div class="game__vignet__betslist__container">
              <v-sheets :key="bet.id" v-for="bet in game.betslist" >
                <v-row>
                  <div class="chips mb-2">
                    {{bet.label}}
                    <v-btn to="/dashboard" round small>
                      <v-icon x-small dark>mdi-lead-pencil</v-icon>
                    </v-btn>
                  </div>

                </v-row>
              </v-sheets>

              </div>
            </v-sheet>
          </v-row>
        </template>
        <v-progress-circular
					:size="130"
					:width="7"
					:color="colorBackgroundLight"
					indeterminate
          v-else
				/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex';
import {
  colorBtn,
  spaceInside, 
  colorBackgroundLight, 
  darkText
} from '@/style/colors.vars';
  export default {
    data() {
      return {
        colorBtn,
        spaceInside, 
        colorBackgroundLight, 
        darkText,
        dataLoaded: false
      }
    },
    computed: {
      ...mapState({
        // _user: state => state.gamedays.gamesLoaded === true && state.user,
        _user: state => state.user,
        _games: state => state.gamedays
      })
    },
    mounted () {
      console.log("loaded :", this.dataLoaded)
      console.log("loaded :", this.dataLoaded)
      this.initApp();
      
      if(this.dataLoaded && this._user.role !== 'Moderator') {
        this.$router.push({
          path: '/dashboard',
        });
      }
    },
    updated () {
      console.log('this._games', this._games);
    },
    methods: {
      initApp: async function () {
        if (this._games.gamesLoaded === false) {
          try {
            await this.$store.dispatch('getGamedays');
          } catch (err) {
            this.dataError = {
              status: true,
              message:
                "Hey ! il y a un petit problème de démarage, de l'application, l'équipe bosse certainement déjà dessus ! 🏒",
            };
            throw `Petit problème dans la récupération des journées de matchs`;
          }
          try {
            await this.$store.dispatch('getAllBets');
          } catch (err) {
            this.dataError = {
              status: true,
              message:
                "Hey ! il y a un petit problème de démarage, de l'application, l'équipe bosse certainement déjà dessus ! 🏒",
            };
            throw `Petit problème dans la récupération des paris soumis`;
          }
          try {
            await this.$store.dispatch('getTeammates');
          } catch (err) {
            this.dataError = {
              status: true,
              message:
                "Hey ! il y a un petit problème de démarage, de l'application, l'équipe bosse certainement déjà dessus ! 🏒",
            };
            throw `Petit problème dans la récupération des teammates`;
          }
          this.dataLoaded = true;
        }
        if (this._games.gamesLoaded) {
          console.log('return loaded ?')
          this.dataLoaded = true;
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.moderator-space{
  .page-title{
    width: 100%;
    text-align: center;
  }
  .game__vignet{
    width: 100%;
    &__betslist__container{
      .chips{
        display: flex;
        justify-content: space-between;
        width: 100%;
        background: #3949AB;
        color: #ffffff;
        border-radius: 4px;
        padding: 5px 15px;
        box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.25);
        .v-btn{
          margin-left: 10px;
          background: #283593;
        }
      }
    }
  }
}
</style>