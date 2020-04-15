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
          <v-icon small dark class="mr-2"> mdi-hockey-sticks </v-icon>
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
          <ModeFutureGames :games="_games" />
          <ModePastGames :pastGames="_games.pastGames" />
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
import ModeFutureGames from './ModeFutureGames'
import ModePastGames from './ModePastGames'
import { mapState, mapActions } from 'vuex';
import {
  colorBtn,
  spaceInside, 
  colorBackgroundLight, 
  darkText
} from '@/style/colors.vars';

  export default {
    components: {
      ModeFutureGames,
      ModePastGames
    },
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
      this.initApp();
      
      if(this.dataLoaded && this._user.role !== 'Moderator') {
        this.$router.push({
          path: '/dashboard',
        });
      }
    },
    methods: {
      ...mapActions(["getCategoriesOfBets"]),
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
          try {
            await this.$store.dispatch('getCategoriesOfBets');
          } catch (error) {
            throw `une erreure est arrivé dans la récupération des catégories ${error}`
          }
          this.dataLoaded = true;
        }
        if (this._games.gamesLoaded) {  
          this.dataLoaded = true;
        }
      },
    },
  }
</script>

<style lang="scss">
.moderator-space{
  .page-title{
    width: 100%;
    text-align: center;
  }
  .game__vignet{
    width: 100%;
    &__betslist{
      &__container{
        .chips{
          display: flex;
          justify-content: space-between;
          width: 100%;
          background: #3949AB;
          color: #ffffff;
          border-radius: 4px;
          padding: 7px 15px;
          padding-right: 7px;
          box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.25);
          .v-btn{
            min-height: 25px;;
            margin-left: 10px;
            background: #1A237E;
          }
        }
      }
      &__list{
        background: #C5CAE9;
        border-radius: 4px;
        &__item{
          position: relative;
          z-index: 1;
          padding: 5px 15px;
          
          &:before{
            content: '';
            position: absolute;
            z-index: 9;
            top: 100%;
            height: 1px ;
            width: calc(100% - 30px);
            background: rgba(0,0,0,0.25);
            left: 15px;
          }
          &:last-child::before{
            display: none;
          }
        }
      }
    }
  }
}
</style>