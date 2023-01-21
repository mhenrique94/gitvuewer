<template>
  <v-list>
    <v-list-item v-for="el in repoRoot" :key="el.name">
      <v-icon> {{ el.type == "file" ? "mdi-file" : "mdi-folder" }}</v-icon>
      <v-list-item-title>{{ el.name }} </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
// import { requests } from "@/api/requests.js";

export default {
  name: "FileExplorer",
  props: ["repoRoot"],
};
</script>
