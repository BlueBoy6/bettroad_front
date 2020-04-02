export default {
    state: {
        id: localStorage.userId ? localStorage.userId : null,
        name: localStorage.userName || null,
        role: null,
        token: localStorage.userToken || null
    },
    mutations: {
        login(state, payload) {
			state.user = payload;
		},
		logout(state) {
			state.user = {
				id: null,
				name: null,
				role: null,
				token: null
			};
			state.gamedays = null;
			state.bets = null;
			state.teamMates = null;
		},
    }
}