<template>
  <v-container class="home grey lighten-5">
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
                  v-on:click="openDistrictTracker(item.statecode)"
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
    openDistrictTracker: function(statecode) {
      this.$router.push({ name: "State", params: { statecode: statecode } });
    }
  }
};
</script>

<style>
.fadeInUp {
  -webkit-animation-duration: 0.45s;
  animation-duration: 0.45s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
.table-fineprint {
  color: rgba(108, 117, 125, 0.6);
  font-weight: 600;
  margin: 0 0.25rem 0.25rem 0;
  text-align: right;
  font-size: 12px !important;
}
.table-fineprint a {
  border-bottom: 2px solid rgba(108, 117, 125, 0.12549);
  color: inherit;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}
.table {
  align-self: center;
  border-collapse: separate;
  border-spacing: 3px 4px;
  position: relative;
  width: 37rem;
}
table thead {
  background: rgba(108, 117, 125, 0.0627451);
  color: #6c757d;
  font-size: 0.75rem;
  text-align: left;
}
table thead th {
  background: #f6f6f7;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 5px;
  transition: all 0.1s ease-in-out;
}
table .heading-content {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}
table .heading-content .heading-text {
  color: #6c757d;
  text-align: right;
}
table tbody {
  color: #6c757d;
}
table tbody tr:nth-child(odd) {
  background: rgba(108, 117, 125, 0.0627451);
}
table tbody tr {
  cursor: pointer;
}
table tbody td:first-child {
  font-weight: 600;
  max-width: 7.5rem !important;
  text-align: left;
  word-wrap: break-word !important;
}
table tbody td {
  border-radius: 4px;
  font-size: 0.9rem;
  padding: 0.25rem;
  text-align: right;
}
table tbody .title-chevron {
  position: relative;
}
table tbody .title-chevron > * {
  align-self: center;
}
table .dropdown {
  background: rgba(108, 117, 125, 0.0627451);
  border-radius: 50%;
  cursor: pointer;
  height: 13px;
  left: -1.25rem;
  position: absolute;
  top: 0.125rem;
  transition: background 0.2s ease-in-out;
  width: 13px;
}
table tbody .title-chevron {
  position: relative;
}
.rotateDownRight {
  -webkit-animation-duration: 0.25s;
  animation-duration: 0.25s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: rotateDownRight;
  animation-name: rotateDownRight;
}
table .dropdown svg {
  left: 1px;
  position: absolute;
  stroke-width: 3;
  top: -0.35rem;
  width: 11px;
}
table tbody td .delta {
  display: inline-block;
  font-size: 11px !important;
}
table tbody td .delta.is-confirmed {
  color: #ff073a;
}
table tbody td .total {
  margin-left: 0.25rem;
  font-weight: 500;
}
.v-icon .icon-recovered {
  height: 9px;
  stroke-width: 3;
  width: 9px;
  color: "#ff073a";
}

table .v-icon.v-icon {
  font-size: 11px;
  margin-bottom: 3px;
}
table .v-icon.v-icon.is-confirmed {
  color: #ff073a;
}
table .v-icon.v-icon.is-recovered {
  color: #28a745;
}
table .v-icon.v-icon.sort {
  font-size: 16px;
  font-weight: 800;
  margin-top: 5px;
}

table tbody td .delta.is-deaths {
  color: #6c757d;
}

table.arrow-down,
.arrow-up {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  margin-left: 0.25rem;
}
table.arrow-up {
  border-bottom: 5px solid rgba(108, 117, 125, 0.6);
}
table.arrow-down {
  border-top: 5px solid rgba(108, 117, 125, 0.6);
}
</style>
