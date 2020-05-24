<template>
  <div class="state">
    <v-container class="state grey lighten-5">
      <v-row no-gutters>
        <h6 class="home-link" v-on:click="goHome()">Home</h6>
        <v-col v-if="districtData && zones && zones.zones" class="state-left">
          <DistrictTracker
            v-bind:data="districtData"
            v-bind:zones="zones.zones"
          />
        </v-col>
        <v-col class="state-right"></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DistrictTracker from "@/components/DistrictTracker";
export default {
  name: "State",
  mounted() {
    this.$store.dispatch("loadSateDistrictData");
    this.$store.dispatch("loadDistrictZones");
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["districtData"]),
    ...mapState(["zones"]),
    ...mapState(["statewiseData"])
  },
  components: {
    DistrictTracker
  },
  methods: {
    goHome: function() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.home-link {
  font-size: 14px;
  font-weight: 500;
  padding: 1rem;
  width: 100%;
  cursor: pointer;
  display: block;
}
</style>
