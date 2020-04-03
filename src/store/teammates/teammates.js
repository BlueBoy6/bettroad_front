import { getTeammates as getTeam } from "../../helpers/betsdata";
export default {
    state: {
        players: []
    },
    mutations:{
        storeTeammates(state, payload) {
			state.players = payload;
		},
    },
    actions:{
         async getTeammates({state, commit, rootState }) {
            if (state.teamMates) {
                return state.teamMates;
            }
            const teammates = await getTeam(rootState.user.token);
            if (teammates) {
                commit("storeTeammates", teammates);
                return {
                    statusText: "OK"
                };
            }
            return {
                statusText: "KO"
            };
        }
    }
}