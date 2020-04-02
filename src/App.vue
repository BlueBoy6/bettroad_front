<template>
  <v-app class="page__view">
    <v-toolbar class="top__menu" v-if="userConnected">
      <v-app-bar-nav-icon @click="openMenuAction"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-avatar size="40">
        <img :src="require('./assets/favicon.jpg')" alt="road" />
      </v-avatar>
    </v-toolbar>

    <v-navigation-drawer
      v-if="userConnected"
      v-model="openMenu"
      absolute
      temporary
      justify="center"
    >
      <v-row class="mx-0">
        <v-col class="px-10">
          <p class="mb-5 title">{{ this.$store.state.user.name}}</p>
          <v-btn width="100%" :class="colorInputs" @click="disconnect">Deconnexion</v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { colorInputs } from "../src/style/colors.vars";
export default {
  data() {
    return {
      colorInputs,
      openMenu: false
    };
  },
  computed: {
    userConnected: function() {
      // eslint-disable-next-line no-console
      console.log('this.state', this.$store.state);
      if (this.$store.state.user.id === null) {
        return false;
      }
      return true;
    }
  },
  methods: {
    openMenuAction: function() {
      this.openMenu = true;
    },
    disconnect: function() {
      this.openMenu = false;
      this.$store.commit("logout");
      localStorage.clear();
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style lang="scss">
.page__view {
  .top__menu {
    max-height: 60px;
  }
}
</style>