/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { loginConnect } from "../../helpers/login";
export default {
    state: {
        id: localStorage.userId ? localStorage.userId : null,
        name: localStorage.userName || null,
        role: null,
		token: localStorage.userToken || null,
		team: {name: localStorage.userTeam},
		email: null
    },
    mutations: {
        loginSaved(state, payload) {

			state.id = payload.id;
			state.name = payload.name;
			state.role = payload.role;
			state.token = payload.token;
			state.team = payload.team;
			state.email = payload.email;
		},
		logoutSaved(state) {
			state.id = null;
			state.name = null;
			state.role = null;
			state.token = null;
		},
	},
	actions: {
		async login({state, commit, rootState }, payload) {
			try{
				const connect = await loginConnect(payload.login, payload.password);
				commit('loginSaved', connect.user)
				return {status: 'OK'}
			} catch (err){
				throw `Nous ne sommes pas arrivé à nous connecter à votre compte : ${err}`
			}
		},
		logout({state, commit, rootState }) {
			commit('logoutSaved')
			localStorage.clear();
			
		}
	}
}