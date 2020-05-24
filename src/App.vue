<template>
  <v-container fluid>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :permanent="permanent"
      fixed
      dark
      v-show="$vuetify.breakpoint.lg"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-icon>
            <v-icon>{{ "mdi-snowflake" }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="menu-item">
            <v-list-item-title>COVID19</v-list-item-title>
            <v-list-item-subtitle>INDIA</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="menu-item">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "Demographics", icon: "mdi-account-multiple" },
        { title: "Deep Dive", icon: "mdi-sort-variant" },
        { title: "Essentials", icon: "mdi-checkbox-multiple-blank-outline" },
        { title: "About", icon: "mdi-help-circle-outline" }
      ],
      color: "primary",
      permanent: false,
      miniVariant: true,
      expandOnHover: true,
      background: false
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700");

body {
  background-color: #eeeeee;
  font-family: "Roboto", sans-serif;
}
body,
html {
  margin: 0;
  height: 100%;
}
.menu-item {
  margin-left: 1rem;
}
</style>
