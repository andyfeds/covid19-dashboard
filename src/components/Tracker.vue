<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <h5 class="table-fineprint fadeInUp" style="animationDelay: '1.5s'">
        Compiled from State Govt. numbers,'
        <a href="#" style="color: '#6c757d'">know more</a>
      </h5>
      <h5 class="table-fineprint fadeInUp" style="animationDelay: '1.5s'">
        District zones as published by MoHFW',
        <a
          href="https://www.facebook.com/airnewsalerts/photos/a.262571017217636/1710062729135117/?type=3&theater"
          style="color: '#6c757d'"
          >source</a
        >
      </h5>
      <table
        class="table table-striped fadeInUp"
        style="animation-delay: 1.8s;"
      >
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.state">
              <div v-on:click="sortBy(column.key)" class="heading-content">
                <span class="heading-text">{{ column.label }}</span>
                <div
                  v-bind:style="{
                    display: column.key === currentSort ? 'initial' : 'none'
                  }"
                >
                  <v-icon class="sort" v-if="currentSortDir == 'asc'">{{
                    "mdi-chevron-up"
                  }}</v-icon>
                  <v-icon class="sort" v-if="currentSortDir == 'desc'">{{
                    "mdi-chevron-down"
                  }}</v-icon>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in sortedStateData" :key="item.state">
            <td>
              <div class="title-chevron">
                <span class="dropdown rotateDownRight">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
                <span
                  v-on:click="
                    openDistrictTracker(item.statecode, item.lastupdatedtime)
                  "
                  class="title-icon"
                  >{{ item.state }}</span
                >
              </div>
            </td>
            <td>
              <span class="delta is-confirmed" v-if="item.deltaconfirmed > 0">
                <v-icon class="is-confirmed">{{ "mdi-arrow-up" }}</v-icon>
                {{ item.deltaconfirmed }}
              </span>
              <span class="total">{{ item.confirmed }}</span>
            </td>
            <td>
              <div class="total">{{ item.active }}</div>
            </td>
            <td>
              <span class="delta is-recovered" v-if="item.deltarecovered > 0">
                <v-icon class="is-recovered">{{ "mdi-arrow-up" }}</v-icon>
                {{ item.deltarecovered }}
              </span>
              <span class="total">{{ item.recovered }}</span>
            </td>
            <td>
              <span class="delta is-deaths" v-if="item.deltadeaths > 0">
                <v-icon>{{ "mdi-arrow-up" }}</v-icon>
                {{ item.deltadeaths }}
              </span>
              <span class="total">{{ item.deaths }}</span>
            </td>
          </tr>
        </tbody>
        <tbody v-if="total">
          <tr class="state is-total">
            <td>
              <div class="title-chevron">
                <span class="title-icon">Total</span>
              </div>
            </td>
            <td>
              <span class="delta is-confirmed" v-if="total.deltaconfirmed > 0">
                <v-icon class="is-confirmed">{{ "mdi-arrow-up" }}</v-icon>
                {{ total.deltaconfirmed }}
              </span>
              <span class="total">{{ total.confirmed }}</span>
            </td>
            <td>
              <span class="delta is-active"></span>
              <span class="total">{{ total.active }}</span>
            </td>
            <td>
              <span class="delta is-recovered" v-if="total.deltarecovered > 0">
                <v-icon class="is-recovered">{{ "mdi-arrow-up" }}</v-icon>
                {{ total.deltarecovered }}
              </span>
              <span class="total">{{ total.recovered }}</span>
            </td>
            <td>
              <span class="delta is-deaths" v-if="total.deltadeaths > 0">
                <v-icon class="is-deaths">{{ "mdi-arrow-up" }}</v-icon>
                {{ total.deltadeaths }}
              </span>
              <span class="total">{{ total.deaths }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Tracker",
  props: ["statewise"],
  data() {
    return {
      currentSort: "state",
      currentSortDir: "asc",
      columns: [
        {
          label: "State/UT",
          key: "state"
        },
        {
          label: "Confirmed",
          key: "confirmed"
        },
        {
          label: "Active",
          key: "active"
        },
        {
          label: "Recovered",
          key: "recovered"
        },
        {
          label: "Deceased",
          key: "deaths"
        }
      ]
    };
  },
  computed: {
    sortedStateData: function() {
      if (this.statewise != null) {
        return this.statewise
          .filter(state => state.statecode !== "TT")
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === "desc") modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
      }
      return [];
    },
    total: function() {
      if (this.statewise != null) {
        return this.statewise.find(state => state.statecode == "TT");
      }
      return null;
    }
  },
  methods: {
    sortBy: function(col) {
      if (this.currentSort == col) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      } else {
        this.currentSort = col;
      }
    },
    openDistrictTracker: function(statecode, updatedTime) {
      localStorage.setItem("lastUpdatedTime", updatedTime);
      this.$router.push({ name: "State", params: { statecode: statecode } });
    }
  }
};
</script>

<style lang="scss" scoped></style>
