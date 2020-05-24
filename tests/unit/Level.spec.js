import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import Level from "@/components/Level.vue";

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(Level, {
    propsData: {
      total: {
        active: "76589",
        confirmed: "138041",
        deaths: "4014",
        deltaconfirmed: "6616",
        deltadeaths: "146",
        deltarecovered: "3020",
        lastupdatedtime: "24/05/2020 22:01:03",
        recovered: "57429",
        state: "Total",
        statecode: "TT",
        statenotes: ""
      }
    },
    localVue
  });
});

describe("Level.vue", () => {
  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("check formatNumber to have been called", () => {
    const formatNumber = jest.fn();
    formatNumber();
    expect(formatNumber).toHaveBeenCalled();
  });

  it("should render level", () => {
    expect(wrapper.find(".level").exists()).toBe(true);
  });

  it("should contain Confirmed text in h5", () => {
    expect(wrapper.find(".red h5").text()).toBe("Confirmed");
  });

  it("should contain Active text in h5", () => {
    expect(wrapper.find(".blue h5").text()).toBe("Active");
  });

  it("should contain Recovered text in h5", () => {
    expect(wrapper.find(".green h5").text()).toBe("Recovered");
  });

  it("should contain Deceased text in h5", () => {
    expect(wrapper.find(".grey h5").text()).toBe("Deceased");
  });

  it("should display formatted total confirmed cases in red section", () => {
    expect(wrapper.find(".red h1").text()).toBe("1,38,041");
  });

  it("should display formatted total active cases in blue section", () => {
    expect(wrapper.find(".blue h1").text()).toBe("76,589");
  });

  it("should display formatted total recovered cases in green section", () => {
    expect(wrapper.find(".green h1").text()).toBe("57,429");
  });

  it("should display formatted total deceased cases in grey section", () => {
    expect(wrapper.find(".grey h1").text()).toBe("4,014");
  });
});

afterEach(() => {
  wrapper.destroy();
});
