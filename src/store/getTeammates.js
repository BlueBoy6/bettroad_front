/* eslint-disable no-console */
import { getTeammates as getTeam } from "../helpers/betsdata";

export const getTeammates = async function(context) {
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
};
