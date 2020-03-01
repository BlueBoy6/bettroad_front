/* eslint-disable no-console */
import { getTeams as getTeamsChampionship } from '../helpers/betsdata';

export const getTeams = async function(context) {
	const teams = await getTeamsChampionship(context.state.user.token);
	if (teams) {
		console.log('teams', teams);
		context.commit('storeTeamschampionship', teams);
		return teams;
	}
	return null;
};
