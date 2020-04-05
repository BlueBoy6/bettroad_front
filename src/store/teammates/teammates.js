/* eslint-disable no-console */
import { getTeammates as getTeam } from '../../helpers/betsdata';
export default {
	state: {
		players: []
	},
	mutations: {
		storeTeammates(state, payload) {
			state.players = payload;
		}
	},
	actions: {
		async getTeammates({ state, commit, rootState }) {
			if (state.teamMates) {
				return state.teamMates;
			}
			try {
				const teammates = await getTeam(rootState.user.token);
				commit('storeTeammates', teammates);
				return {
					statusText: 'OK'
				};
			} catch (err) {
				throw `Une erreur est arrivé lors de la récupération des équipes du championnat : ${err}`;
			}
		}
	}
};
