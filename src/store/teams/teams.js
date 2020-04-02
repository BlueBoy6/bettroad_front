import { getTeams as getTeamsChampionship } from '../../helpers/betsdata';
export default {
    state: {
        teamsChampionship: null
    },
    mutations: {
        storeTeamschampionship(state, payload) {
			state.teamsChampionship = payload;
		},
    },
    actions: {
        async getTeams(context) {
            const teams = await getTeamsChampionship(context.state.user.token);
            if (teams) {
                context.commit('storeTeamschampionship', teams);
                return teams;
            }
            return null;
        }
    }
}