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
            <v-list-item-title class="menu-item">
              {{ item.title }}
            </v-list-item-title>
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

<style lang="scss">
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
  display: block;
  width: 100%;
  a {
    border-bottom: 2px solid rgba(108, 117, 125, 0.12549);
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
  }
}
table thead th {
  background: #f6f6f7;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 5px;
  transition: all 0.1s ease-in-out;
  z-index: 1;
}
table {
  align-self: center;
  border-collapse: separate;
  border-spacing: 3px 4px;
  position: relative;
  width: 37rem;
  .thead {
    background: rgba(108, 117, 125, 0.0627451);
    color: #6c757d;
    font-size: 0.5rem;
    text-align: left;
  }
  .heading-content {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    .heading-text {
      color: #6c757d;
      text-align: right;
      font-size: 14px;
    }
  }
  tbody {
    color: #6c757d;
    tr:nth-child(odd) {
      background: rgba(108, 117, 125, 0.0627451);
    }
    tr {
      cursor: pointer;
    }
    td:first-child {
      font-weight: 600;
      max-width: 7.5rem !important;
      text-align: left;
      word-wrap: break-word !important;
    }
    td {
      border-radius: 4px;
      font-size: 0.9rem;
      padding: 0.25rem;
      text-align: right;
      .delta {
        display: inline-block;
        font-size: 11px !important;
        &.is-confirmed {
          color: #ff073a;
        }
        &.is-recovered {
          color: #28a745;
        }
        &.is-deaths {
          color: #6c757d;
        }
      }
      .total {
        margin-left: 0.25rem;
        font-weight: 500;
      }
    }
    .title-chevron {
      position: relative;
    }
    .title-chevron > * {
      align-self: center;
    }
    .rotateDownRight {
      -webkit-animation-duration: 0.25s;
      animation-duration: 0.25s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation-name: rotateDownRight;
      animation-name: rotateDownRight;
    }
  }
  .dropdown {
    background: rgba(108, 117, 125, 0.0627451);
    border-radius: 50%;
    cursor: pointer;
    height: 13px;
    left: -1.25rem;
    position: absolute;
    top: 0.125rem;
    transition: background 0.2s ease-in-out;
    width: 13px;
    svg {
      left: 1px;
      position: absolute;
      stroke-width: 3;
      top: -0.35rem;
      width: 11px;
    }
  }
  .v-icon .icon-recovered {
    height: 9px;
    stroke-width: 3;
    width: 9px;
    color: "#ff073a";
  }

  .v-icon.v-icon {
    font-size: 11px;
    margin-bottom: 3px;
  }
  .v-icon.v-icon.is-confirmed {
    color: #ff073a;
  }
  .v-icon.v-icon.is-recovered {
    color: #28a745;
  }
  .v-icon.v-icon.sort {
    font-size: 16px;
    font-weight: 800;
    margin-top: 5px;
  }
  .arrow-up {
    border-bottom: 5px solid rgba(108, 117, 125, 0.6);
  }
  .arrow-down {
    border-top: 5px solid rgba(108, 117, 125, 0.6);
  }
  .arrow-down,
  .arrow-up {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    margin-left: 0.25rem;
  }
}
</style>
