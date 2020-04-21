/* eslint-disable no-console */
import { getGamedays as getCalendar } from '../../helpers/calendar';
import { dateFormater, getSeason } from '../../helpers/calendar';
import moment from 'moment';
import momentfr from '../../helpers/momentfr';

export default {
	state: {
		gamesLoaded: false,
		nextGame: null,
		futureGames: null,
		pastGames: null,
		allGames: null,
		seasons: null
	},
	mutations: {
		storeAllGames(state, payload) {
			state.allGames = payload.allgames;
			state.pastGames = payload.pastgames;
			state.nextGame = payload.nextgame;
			state.futureGames = payload.futuregames;
			state.gamesLoaded = payload.gamesloaded;
			state.seasons = payload.seasons;
		},
		storeNextGame(state, payload) {
			state.nextGame = payload;
		},
		storeFutureGames(state, payload) {
			state.futureGames = payload;
		},
		storePastGames(state, payload) {
			state.pastGames = payload;
		},
		storeGamesLoaded(state, payload) {
			state.gamesLoaded = payload;
		},
		clearGamedays(state) {
			state.gamesLoaded = false;
			state.allGames = null;
			state.pastGames = null;
			state.nextGame = null;
			state.futureGames = null;
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		async getGamedays({ state, commit, rootState }) {
			momentfr;
			try {
				const games = await getCalendar(rootState.user.token);
				if (games) {
					const gamesSortedFormated = games
						.sort((a, b) => Date.parse(b.day) - Date.parse(a.day))
						.map((date, i) => {
							return {
								...date,
								day: {
									...dateFormater(date.day),
									dayNumber: games.length - i,
									season: getSeason(date.day)
								},
							};
						});

					const pastGames = gamesSortedFormated.filter((date) => {
						return moment(date.day.en).isBefore(Date.now()) && date;
					});

					const futureGames = gamesSortedFormated.filter((date) => {
						return moment(date.day.en).isAfter(Date.now()) && date;
					});

					const seasonsTab = gamesSortedFormated.reduce((acc, curr) => {
						const season = curr.day.season.join('')
						const seasons = acc.map(seasonYear => seasonYear.join(''))
						if(!seasons.includes(season)){
							acc.push(curr.day.season)
						}
						return acc;
					},[])

					const storeGames = {
						gamesloaded: true,
						nextgame: futureGames[0] || [],
						futuregames: futureGames || [],
						pastgames: pastGames,
						allgames: gamesSortedFormated,
						seasons: seasonsTab
					};
					
					commit('storeAllGames', storeGames);
					return { statusText: 'OK' };
				}
			} catch (err) {
				throw "Nous n'avons pas réussi à récupérer les jours de matchs";
			}
		},
	},
};
