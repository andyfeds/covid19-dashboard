<template>
  <v-container class="home grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="6"
        v-if="statewiseData && statewiseData.statewise"
        class="home-left"
      >
        <div class="header fadeInUp" style="animationDelay: '1s'">
          <Search />
          <div v-if="statewiseData.statewise[0]" class="actions">
            <h5>
              {{
                isNaN(
                  Date.parse(
                    formatDate(statewiseData.statewise[0].lastupdatedtime)
                  )
                )
                  ? ""
                  : `${formatDateAbsolute(
                      statewiseData.statewise[0].lastupdatedtime
                    )} IST`
              }}
            </h5>
            <v-icon class="bell-icon">{{ "mdi-bell-outline" }}</v-icon>
          </div>
          <Level v-bind:total="statewiseData.statewise[0]" />
          <MiniChart v-bind:timeseries="timeseries" />
          <!-- <Table v-bind:statewise="statewiseData.statewise" /> -->
          <Tracker v-bind:statewise="statewiseData.statewise" />
        </div>
      </v-col>
      <v-col cols="12" md="6" class="home-right"></v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import Table from "@/components/Table.vue";
import Tracker from "@/components/Tracker.vue";
import Level from "@/components/Level.vue";
import Search from "@/components/Search.vue";
import MiniChart from "@/components/MiniChart.vue";
import {
  formatDate,
  formatDateAbsolute,
  preprocessTimeseries
} from "../utils/common";
import { mapState } from "vuex";
export default {
  name: "Home",
  mounted() {
    this.$store.dispatch("loadDailyData");
  },
  data() {
    return {};
  },
  computed: {
    timeseries: function() {
      return preprocessTimeseries(this.statewiseData.cases_time_series);
    },
    ...mapState(["statewiseData"])
  },
  components: {
    Search,
    Level,
    MiniChart,
    Tracker
  },
  methods: {
    formatDate(value) {
      return formatDate(value);
    },
    formatDateAbsolute(value) {
      return formatDateAbsolute(value);
    },
    getTimeseries() {
      this.timeseries = preprocessTimeseries(
        this.statewiseData.cases_time_series
      );
      console.log("TIMESERIES", this.timeseries);
    }
  }
};
</script>
<style>
.home {
  margin-top: 60px;
}
Search {
  height: 140px;
}
.actions > * {
  align-self: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
  margin-top: -3rem;
}
.actions h5 {
  color: #6c757d;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.actions .bell-icon {
  font-size: 18px;
  position: relative;
}
</style>
