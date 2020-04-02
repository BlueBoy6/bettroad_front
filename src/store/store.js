/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

import user from './user/user'
import gamedays from './gamedays/gamedays'
import prizepool from './prizepool/prizepool'
import bets from './bets/bets'
import teams from './teams/teams'
import teammates from './teammates/teammates'



Vue.use(Vuex);
export default new Vuex.Store({
	modules: { user, gamedays, bets, prizepool, teams, teammates },
});
