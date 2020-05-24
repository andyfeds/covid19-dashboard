<template>
  <v-data-table
    show-expand
    :headers="headers"
    :items="statewise"
    :single-expand="singleExpand"
    :disable-pagination="true"
    item-key="statecode"
    multi-sort
    class="elevation-1 statewise-tracker-table"
  >
    <template v-slot:item.state="{ item }">
      <p>
        <span class="delta is-confirmed" v-if="item.deltaconfirmed > 0">
          <v-icon class="is-confirmed">{{ "mdi-arrow-up" }}</v-icon>
          {{ item.deltaconfirmed }}
        </span>
        {{ item.confirmed }}
      </p>
    </template>
    <template v-slot:item.confirmed="{ item }">
      <p class="right-aligned">
        <span class="delta is-confirmed" v-if="item.deltaconfirmed > 0">
          <v-icon class="is-confirmed">{{ "mdi-arrow-up" }}</v-icon>
          {{ item.deltaconfirmed }}
        </span>
        {{ item.confirmed }}
      </p>
    </template>

    <template v-slot:item.recovered="{ item }">
      <p class="right-aligned">
        <span class="delta is-recovered" v-if="item.deltarecovered > 0">
          <v-icon class="is-recovered">{{ "mdi-arrow-up" }}</v-icon>
          {{ item.deltarecovered }}
        </span>
        {{ item.recovered }}
      </p>
    </template>
    <template v-slot:item.active="{ item }">
      <p class="right-aligned">{{ item.active }}</p>
    </template>
    <template v-slot:item.deaths="{ item }">
      <p class="right-aligned">
        <span class="delta" v-if="item.deltadeaths > 0">
          <v-icon>{{ "mdi-arrow-up" }}</v-icon>
          {{ item.deltadeaths }}
        </span>
        {{ item.deaths }}
      </p>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.state }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Table",
  props: ["statewise"],
  data() {
    return {
      headers: [
        {
          text: "State/UT",
          align: "start",
          sortable: true,
          value: "state"
        },
        { text: "Confirmed", align: "end", value: "confirmed" },
        { text: "Active", align: "end", value: "active" },
        { text: "Recovered", align: "end", value: "recovered" },
        { text: "Deceased", align: "end", value: "deaths" }
      ],
      singleExpand: true
    };
  },
  methods: {
    getDeltaConfirmed(deltaconfirmed) {
      if (deltaconfirmed > 0) return true;
    },
    getDeltaRecovered(deltarecovered) {
      if (deltarecovered > 0) return "#28a745";
    }
  }
};
</script>
<style scoped>
.statewise-tracker-table {
  border-spacing: 0.25rem;
}
.theme--light.v-data-table {
  background-color: #ffffff;
  color: #6c757d;
  font-weight: 600;
  font-size: 0.9rem;
}

.v-data-table {
  color: #6c757d;
}
.right-aligned {
  text-align: right;
}

.v-icon .icon-recovered {
  height: 9px;
  stroke-width: 3;
  width: 9px;
  color: "#ff073a";
}
.delta {
  font-size: 11px !important;
}
.is-confirmed {
  color: #ff073a;
}
.is-recovered {
  color: #28a745;
}

.v-icon.v-icon {
  font-size: 11px !important;
}
</style>
