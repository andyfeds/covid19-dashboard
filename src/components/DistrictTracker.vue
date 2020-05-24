<template>
  <div class="container">
    <div class="header">
      <div class="header-left fadeInUp" style="animation-delay: 0.3s;">
        <h1>{{ stateName }}</h1>
        <!-- <h5>{{}}</h5> -->
      </div>
      <!-- <div class="header-right fadeInUp" style="animation-delay: 0.5s;">
        <h5>Tested</h5>
        <h2>60,405</h2>
        <h5 class="timestamp">As of 23 May</h5>
      </div> -->
    </div>
    <table class="table table-striped fadeInUp" style="animation-delay: 1.8s;">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.district">
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

      <tbody v-if="districts">
        <tr v-for="item in Object.keys(districts)" :key="item">
          <td :class="['is-' + getZone(item)]">
            <div class="title-chevron">
              <span class="title-icon">{{ item }}</span>
            </div>
          </td>
          <td>
            <span
              class="delta is-confirmed"
              v-if="districts[item].delta.confirmed > 0"
            >
              <v-icon class="is-confirmed">{{ "mdi-arrow-up" }}</v-icon>
              {{ districts[item].delta.confirmed }}
            </span>
            <span class="total">{{ districts[item].confirmed }}</span>
          </td>
          <td>
            <div class="total">{{ districts[item].active }}</div>
          </td>
          <td>
            <span
              class="delta is-recovered"
              v-if="districts[item].delta.recovered > 0"
            >
              <v-icon class="is-recovered">{{ "mdi-arrow-up" }}</v-icon>
              {{ districts[item].delta.recovered }}
            </span>
            <span class="total">{{ districts[item].recovered }}</span>
          </td>
          <td>
            <span
              class="delta is-deaths"
              v-if="districts[item].delta.deceased > 0"
            >
              <v-icon>{{ "mdi-arrow-up" }}</v-icon>
              {{ districts[item].delta.deceased }}
            </span>
            <span class="total">{{ districts[item].deceased }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getStateName } from "../utils/common";
export default {
  name: "Tracker",
  props: {
    data: Object,
    zones: Array
  },
  data() {
    return {
      currentSort: "district",
      currentSortDir: "asc",
      columns: [
        {
          label: "District",
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
      ],
      statecode: "",
      stateZones: [],
      stateName: ""
    };
  },
  mounted() {
    this.statecode = this.$route.params.statecode;
    this.stateZones = this.getStateZones();
    this.stateName = this.getStateName(this.statecode);
  },
  computed: {
    // sortedData: function() {
    //   if (this.districts != null) {
    //     return this.districts
    //       .sort((a, b) => {
    //         let modifier = 1;
    //         if (this.currentSortDir === "desc") modifier = -1;
    //         if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    //         if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
    //         return 0;
    //       });
    //   }
    //   return [];
    // },

    districts: function() {
      if (this.data != null && this.statecode) {
        let stateName = getStateName(this.statecode);
        if (this.data[stateName]) {
          return this.data[stateName].districtData;
        }
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
    getStateName(code) {
      return getStateName(code);
    },
    getStateZones() {
      if (this.zones != null && this.statecode) {
        return this.zones.filter(zone => zone.statecode == this.statecode);
      }
      return [];
    },
    getZone: function(districtName) {
      if (this.stateZones != null && districtName) {
        let district = this.stateZones.find(
          state => state.district == districtName
        );
        if (district) {
          return district.zone;
        }
      }
      return "None";
    }
  }
};
</script>

<style>
.state .header .header-left h1 {
  color: #e23028;
  max-width: 20rem;
}
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

table tbody td.is-Orange {
  background: rgba(255, 193, 7, 0.12549);
  border-left: 5px solid rgba(253, 126, 20, 0.6);
  color: #fd7e14;
}
table tbody td.is-Red {
  background: rgba(255, 7, 58, 0.12549);
  border-left: 5px solid rgba(255, 7, 58, 0.6);
  color: #ff073a;
}
table tbody td.is-Green {
  background: rgba(40, 167, 69, 0.12549);
  border-left: 5px solid rgba(40, 167, 69, 0.6);
  color: #28a745;
}
</style>
