import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);
export const mutations = {
  SET_STATEWISE_DATA: jest.fn(),
  SET_DISTRICT_DATA: jest.fn(),
  SET_DISTRICT_ZONE_DATA: jest.fn()
};

export const actions = {
  loadDailyData: jest.fn(),
  loadSateDistrictData: jest.fn(),
  loadDistrictZones: jest.fn()
};

export const state = {
  statewiseData: [],
  districtData: [],
  zones: []
};
export const getters = {
  statewiseData: jest.fn().mockReturnValue([]),
  districtData: jest.fn().mockReturnValue([]),
  zones: jest.fn().mockReturnValue([])
};

export function __createMocks(
  custom = { getters: {}, mutations: {}, actions: {}, state: {} }
) {
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockActions = Object.assign({}, actions, custom.actions);
  const mockState = Object.assign({}, state, custom.state);

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState
    })
  };
}

export const store = __createMocks().store;
