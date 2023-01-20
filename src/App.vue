<template>
  <v-app class="main-app">
    <v-app-bar app color="black lighten-2" class="navbar" dark>
      <v-app-bar-title>
        <img :src="require('@/assets/logo.png')" alt="logo" class="logo"
      /></v-app-bar-title>
      <v-toolbar-title>gitVuewer</v-toolbar-title>
      <v-spacer></v-spacer>
      <a href="https://github.com/mhenrique94">
        <img
          contain
          :src="require('@/assets/github-mark-white.png')"
          alt="github logo"
          class="github-logo"
        />
      </a>
    </v-app-bar>

    <v-main>
      <v-container>
        <VuewerBase />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VuewerBase from "./components/VuewerBase";

export default {
  name: "App",

  components: {
    VuewerBase,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.main-app {
  background-color: #0f0f0f;
}
.logo {
  width: 40px;
  filter: invert(100%);
  color: white;
  margin-right: 32px;
}
.github-logo {
  width: 48px;
}
</style>
