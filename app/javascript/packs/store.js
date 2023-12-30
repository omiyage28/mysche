// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scheduleCreated: false,
    flash: { show: false, text: null, type: null },
    schedules: [],
  },
  getters: {
    flash: (state) => state.flash,
  },
  mutations: {
    set_schedule_created(state, value) {
      state.scheduleCreated = value;
    },
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

    createSchedule({ commit }) {
      commit("set_schedule_created", true);
    },
    resetScheduleCreated({ commit }) {
      commit("set_schedule_created", false);
    },
  },
});
