<template>
  <v-container>
    <v-list v-if="!file">
      <v-list-item
        v-for="el in repoRoot"
        :key="el.name"
        @click="loadContent(el)"
      >
        <v-icon> {{ el.type == "file" ? "mdi-file" : "mdi-folder" }}</v-icon>
        <v-list-item-title>{{ el.name }} </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-content v-if="file">{{ file }}</v-content>
  </v-container>
</template>
<script>
import { requests } from "@/api/requests.js";

export default {
  name: "FileExplorer",
  props: ["repoRoot"],
  data() {
    return {
      url: null,
      file: "",
    };
  },
  methods: {
    async loadContent(clicked_element) {
      if (clicked_element.type == "file") {
        await requests
          .get_file(clicked_element.git_url)
          .then((data) => (this.file = data));
      }
    },
  },
};
</script>
