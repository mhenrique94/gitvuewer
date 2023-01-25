<template>
  <v-container>
    <v-sheet class="navigation_control">
      <v-btn @click="back()" v-if="pathArray.length > 0 || file"
        ><v-icon>mdi-arrow-left-thick</v-icon></v-btn
      >
      <v-card-text class="tree_path">{{ url }}</v-card-text>
    </v-sheet>
    <v-container class="file-navigation">
      <v-list v-if="!file" class="list-body">
        <v-list-item
          v-for="el in newDir"
          :key="el.path"
          @click="loadContent(el)"
          class="list-item"
        >
          <v-icon>
            {{
              el.type == "file" || el.type == "blob" ? "mdi-file" : "mdi-folder"
            }}</v-icon
          >
          <v-list-item-title>{{ el.path }} </v-list-item-title>
        </v-list-item>
      </v-list>
      <pre v-if="file" class="file-content"><code>{{ file }}</code></pre>
    </v-container>
  </v-container>
</template>
<script>
import { requests } from "@/api/requests.js";

export default {
  name: "FileExplorer",
  props: ["repoRoot"],
  data() {
    return {
      url: "@root",
      file: "",
      newDir: [],
      pathArray: [],
      lastAccessedItem: [],
    };
  },
  mounted() {
    this.newDir = this.oldDir = this.repoRoot;
  },
  methods: {
    back() {
      if (this.pathArray.length == 1) {
        this.file = null;
        this.newDir = this.repoRoot;
        this.url = this.url.replace(
          this.url.substring(this.url.lastIndexOf("/")),
          ""
        );
        this.pathArray.pop();
        this.lastAccessedItem = [];
        return;
      }
      this.file = null;
      this.url = this.url.replace(
        this.url.substring(this.url.lastIndexOf("/")),
        ""
      );
      this.newDir = this.pathArray.pop();
    },
    async loadContent(clicked_element) {
      this.url += this.getLastItem(clicked_element);
      if (clicked_element.type == "file") {
        this.pathArray.push(this.newDir);
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
      }
      if (clicked_element.type == "blob") {
        this.pathArray.push(this.newDir);
        await requests
          .get_blob(clicked_element.url)
          .then((data) => (this.file = data));
      }
    },
    getLastItem(item) {
      if (item.type != "blob" && item.type != "file") {
        this.lastAccessedItem.push(`/${item.path}`);
      }
      return `/${item.path}`;
    },
  },
  watch: {
    newDir() {
      this.files = null;
    },
    repoRoot() {
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
pre {
  background: #141313;
  border-left: 3px solid #8b8b8b;
  color: rgb(243, 243, 243);
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
}
.tree_path {
  border-bottom: 4px solid #1e1e1e;
  color: rgb(240, 240, 240);
  background-color: #171717;
  font-size: 10pt;
  font-family: monospace;
  box-shadow: rgb(13 13 15 / 25%) 0px 30px 60px -12px inset,
    rgb(31 31 31 / 30%) 0px 18px 36px -18px inset;
}
.list-item {
  display: flex;
  gap: 8px;
  background-color: transparent;
}
.file-navigation {
  background-color: #171717 !important;
}
.list-body {
  background-color: transparent !important;
}
</style>
