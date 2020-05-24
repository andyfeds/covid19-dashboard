<template>
  <v-container>
    <v-row>
      <div v-if="total" class="level">
        <div class="level-item red">
          <h5>Confirmed</h5>
          <h4>
            [
            {{
              isNaN(total.deltaconfirmed)
                ? ""
                : total.deltaconfirmed > 0
                ? "+" + formatNumber(total.deltaconfirmed)
                : "+0"
            }}
            ]
          </h4>
          <h1>{{ formatNumber(total.confirmed) }}</h1>
        </div>
        <div class="level-item blue">
          <h5>Active</h5>
          <h4>{{ "-" }}</h4>
          <h1>{{ formatNumber(total.active) }}</h1>
        </div>
        <div class="level-item green">
          <h5>Recovered</h5>
          <h4>
            [
            {{
              isNaN(total.deltarecovered)
                ? ""
                : total.deltarecovered > 0
                ? "+" + formatNumber(total.deltarecovered)
                : "+0"
            }}
            ]
          </h4>
          <h1>{{ formatNumber(total.recovered) }}</h1>
        </div>
        <div class="level-item grey">
          <h5>Deceased</h5>
          <h4>
            [
            {{
              isNaN(total.deltadeaths)
                ? ""
                : total.deltadeaths > 0
                ? "+" + formatNumber(total.deltadeaths)
                : "+0"
            }}
            ]
          </h4>
          <h1>{{ formatNumber(total.deaths) }}</h1>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { formatNumber } from "../utils/common";
export default {
  name: "Level",
  props: {
    total: {
      type: Object
    }
  },
  // mounted() {
  //   formatNumber(value);
  // },
  methods: {
    formatNumber(value) {
      return formatNumber(value);
    }
  }
};
</script>

<style>
.level {
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 37rem;
}

.level .level-item {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 25%;
}
.level .level-item > * {
  align-self: center;
}
.level .red h4 {
  color: rgba(255, 7, 58, 0.6);
}
.level .red h1,
.level .red h5 {
  color: #ff073a;
}
.level h1,
.level h5 {
  margin-bottom: 1rem;
}
.level h1 {
  font-weight: 600;
  font-size: 24px !important;
}
.level h4 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
h4,
h5 {
  font-weight: 900;
}
h4 {
  font-size: 13px !important;
}

.level h5 {
  font-weight: 600;
  overflow-wrap: break-word;
  text-align: center;
  width: 100%;
}
.red {
  color: #ff073a;
}

.blue {
  color: #007bff;
}
.green {
  color: #28a745;
}

.grey {
  color: #6c757d;
}
</style>
