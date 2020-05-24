import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    statewiseData: [],
    districtData: [],
    zones: []
  },
  mutations: {
    SET_STATEWISE_DATA(state, statewiseData) {
      state.statewiseData = statewiseData;
    },
    SET_DISTRICT_DATA(state, districtData) {
      state.districtData = districtData;
    },
    SET_DISTRICT_ZONE_DATA(state, zones) {
      state.zones = zones;
    }
  },
  actions: {
    loadDailyData({ commit }) {
      axios
        .get("https://api.covid19india.org/data.json")
        .then(r => r.data)
        .then(data => {
          commit("SET_STATEWISE_DATA", data);
        });
    },
    loadSateDistrictData({ commit }) {
      axios
        .get("https://api.covid19india.org/state_district_wise.json")
        .then(r => r.data)
        .then(data => {
          commit("SET_DISTRICT_DATA", data);
        });
    },
    loadDistrictZones({ commit }) {
      axios
        .get("https://api.covid19india.org/zones.json")
        .then(r => r.data)
        .then(data => {
          commit("SET_DISTRICT_ZONE_DATA", data);
        });
    }
  },
  modules: {}
});
