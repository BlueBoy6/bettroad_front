/* eslint-disable no-console */
import { getGamedays as getCalendar } from "../../helpers/calendar";
import { dateFormater } from "../../helpers/calendar";
import moment from "moment";
import momentfr from "../../helpers/momentfr";

export default {
    state: {
        gamesLoaded: false,
        nextGame: null,
        futureGames: null,
        pastGames: null,
        allGames: null
    },
    mutations: {
        storeAllGames(state, payload) {
			state.allGames = payload
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
    },
    actions:{
        // eslint-disable-next-line no-unused-vars
        async getGamedays({state, commit, rootState }) {
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
                                    dayNumber: games.length - i
                                }
                            };
                        });
        
                    const pastGames = gamesSortedFormated.filter(date => {
                        return moment(date.day.en).isBefore(Date.now()) && date;
                    });
        
                    const futureGames = gamesSortedFormated.filter(date => {
                        return moment(date.day.en).isAfter(Date.now()) && date;
                    });
        
                    const storeGames = {
                        nextGame: futureGames[0] || [],
                        futureGames: futureGames.splice(1, futureGames.length) || [],
                        pastGames: pastGames,
                        allGames: gamesSortedFormated
                    };

                    commit("storeAllGames", storeGames.allGames);
                    commit("storePastGames", storeGames.pastGames);
                    commit("storeNextGame", storeGames.nextGame);
                    commit("storeNextGame", storeGames.futureGames);
                    return { statusText: "OK" };
                }
            } catch (err) {
                throw "Nous n'avons pas réussi à récupérer les jours de matchs";
            }
        }

    }

}