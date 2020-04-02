import { getTeammates as getTeam } from "../../helpers/betsdata";
export default {
    state: {
        teamMates: null,
    },
    mutations:{
        storeTeammates(state, payload) {
			state.teamMates = payload;
		},
    },
    actions:{
         async getTeammates(context) {
            if (context.state.teamMates) {
                return context.state.teamMates;
            }
            const teammates = await getTeam(context.state.user.token);
            if (teammates) {
                context.commit("storeTeammates", teammates);
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