<template>
  <v-container>
    <v-sheet class="navigation_control">
      <v-btn @click="back()" v-if="pathArray.length > 0 || file"
        ><v-icon>mdi-arrow-left-thick</v-icon></v-btn
      >
      <v-card-text>{{ url }}</v-card-text>
    </v-sheet>
    <v-container>
      <v-list v-if="!file">
        <v-list-item
          v-for="el in newDir"
          :key="el.path"
          @click="loadContent(el)"
        >
          <v-icon> {{ el.type == "file" ? "mdi-file" : "mdi-folder" }}</v-icon>
          <v-list-item-title>{{ el.path }} </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-content v-if="file">{{ file }}</v-content>
    </v-container>
  </v-container>
</template>
<script>
import { requests } from "@/api/requests.js";

export default {
  name: "FileExplorer",
  props: ["repoRoot", "repo"],
  data() {
    return {
      url: "@root",
      file: "",
      newDir: [],
      pathArray: [],
      lastAccessedItem: "",
    };
  },
  mounted() {
    this.newDir = this.oldDir = this.repoRoot;
  },
  methods: {
    back() {
      if (this.pathArray.length == 0) {
        this.file = null;
        this.newDir = this.repoRoot;
        return;
      }
      this.file = null;
      this.newDir = this.pathArray.pop();
      this.url = this.url.replace(this.lastAccessedItem, "");
    },
    async loadContent(clicked_element) {
      this.url += this.getLastItem(clicked_element.path);
      if (clicked_element.type == "file") {
        await requests
          .get_file(clicked_element.git_url)
          .then((data) => (this.file = data));
      }
      if (clicked_element.type == "dir") {
        this.pathArray.push(this.newDir);
        await requests
          .get_dir(clicked_element.git_url)
          .then((data) => (this.newDir = data));
      }
      if (clicked_element.type == "tree") {
        this.pathArray.push(this.newDir);
        await requests
          .get_dir(clicked_element.url)
          .then((data) => (this.newDir = data));
      } else {
        await requests
          .get_blob(clicked_element.url)
          .then((data) => (this.file = data));
      }
    },
    getLastItem(item) {
      this.lastAccessedItem = `/${item}`;
      return this.lastAccessedItem;
    },
  },
  watch: {
    newDir() {
      this.files = null;
    },
    repo() {
      this.files = null;
      this.newDir = this.repoRoot;
      this.oldDir = this.halfWay = [];
    },
  },
};
</script>
<style scoped>
.navigation_control {
  display: flex;
  align-items: center;
}
</style>
