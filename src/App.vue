<template>
  <v-app class="main-app">
    <v-app-bar app color="black lighten-2" dark> </v-app-bar>

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
</style>
