/* eslint-disable no-console */
import { getTeams as getTeamsChampionship } from '../../helpers/betsdata';
export default {
	state: {
		teamsChampionship: null,
	},
	mutations: {
		storeTeamschampionship(state, payload) {
			state.teamsChampionship = payload;
		},
	},
	actions: {
		async getTeams({ commit, rootState }) {
			try {
				const teams = await getTeamsChampionship(rootState.user.token);
				commit('storeTeamschampionship', teams);
				return teams;
			} catch (err) {
				throw ` Désolé nous ne sommes pas arrivé à récupérer les équipes du championnat ${err}`;
			}
		},
	},
};
