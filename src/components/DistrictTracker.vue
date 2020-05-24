<template>
  <div class="container">
    <div class="header">
      <div class="header-left fadeInUp" style="animation-delay: 0.3s;">
        <h1>{{ stateName }}</h1>
        <h5>
          Last Updated:
          {{
            isNaN(Date.parse(formatDate(getLastUpdatedTime())))
              ? ""
              : `${formatDateAbsolute(getLastUpdatedTime())} IST`
          }}
        </h5>
      </div>
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
                <v-icon class="sort" v-if="currentSortDir == 'asc'">
                  {{ "mdi-chevron-up" }}
                </v-icon>
                <v-icon class="sort" v-if="currentSortDir == 'desc'">
                  {{ "mdi-chevron-down" }}
                </v-icon>
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
import { formatDate, formatDateAbsolute } from "../utils/common";
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
      stateName: "",
      lastUpdatedTime: ""
    };
  },
  mounted() {
    this.statecode = this.$route.params.statecode;
    this.stateZones = this.getStateZones();
    this.stateName = this.getStateName(this.statecode);
  },
  computed: {
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
    },
    getLastUpdatedTime: function() {
      this.lastUpdatedTime = localStorage.getItem("lastUpdatedTime") || "";
      return this.lastUpdatedTime;
    },
    formatDateAbsolute(value) {
      return formatDateAbsolute(value);
    },
    formatDate(value) {
      return formatDate(value);
    }
  }
};
</script>

<style scoped lang="scss">
.state {
  .header {
    margin-bottom: 2rem;
    .header-left h1 {
      color: #e23028;
      max-width: 30rem;
    }
    .header-left h5 {
      color: #6c757d;
      font-weight: 600;
    }
  }
  table {
    tbody {
      td {
        &.is-Orange {
          background: rgba(255, 193, 7, 0.12549);
          border-left: 5px solid rgba(253, 126, 20, 0.6);
          color: #fd7e14;
        }
        &.is-Red {
          background: rgba(255, 7, 58, 0.12549);
          border-left: 5px solid rgba(255, 7, 58, 0.6);
          color: #ff073a;
        }
        &.is-Green {
          background: rgba(40, 167, 69, 0.12549);
          border-left: 5px solid rgba(40, 167, 69, 0.6);
          color: #28a745;
        }
      }
    }
  }
}
</style>
