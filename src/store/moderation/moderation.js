/* eslint-disable no-console */
import { getCategoriesAvailable } from '../../helpers/betsdata';

export default {
  state: {
    betsCategories: null,
  },
  mutations:{
    storeCategories(state, payload){
      state.betsCategories = payload;
    }
  },
  actions:{
    async getCategoriesOfBets({ commit, rootState }){
      const categories = await getCategoriesAvailable(rootState.user.token);
      commit('storeCategories', categories);
    }
  }
}