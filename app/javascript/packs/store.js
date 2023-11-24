// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flash: { show: false, text: null, type: null },
  },
  getters: {
    flash: (state) => state.flash,
  },
  mutations: {
    setFlash(state, { text, type, show = true }) {
      state.flash = { show: show, text: text, type: type };
    },
  },
  actions: {
    setFlash({ commit, dispatch }, { text, type }) {
      commit("setFlash", { text, type });
      setTimeout(() => {
        dispatch("hideFlash");
      }, 5000);
    },
    hideFlash({ commit }) {
      commit("setFlash", { text: null, type: null, show: false });
    },
  },
});
