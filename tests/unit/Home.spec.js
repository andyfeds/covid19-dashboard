import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";
import { __createMocks as createStoreMocks } from "./_mocks_/store";
import Home from "@/views/Home.vue";

// jest.mock('./_mocks_/store');
Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

let storeMocks;
let wrapper;
beforeEach(() => {
  storeMocks = createStoreMocks();
  wrapper = shallowMount(Home, {
    store: storeMocks.store,
    localVue
  });
});

describe("Home.vue", () => {
  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("has a mounted hook", () => {
    expect(typeof Home.mounted).toBe("function");
  });

  it("It should fetch daily statewise data from API.", () => {
    expect(storeMocks.actions.loadDailyData).toBeCalled();
  });

  it("check formatDate to have been called", () => {
    const formatDate = jest.fn();
    formatDate();
    expect(formatDate).toHaveBeenCalled();
  });
});

afterEach(() => {
  wrapper.destroy();
});
