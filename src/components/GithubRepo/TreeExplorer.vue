<template>
  <div>
    <div class="file-popup" v-if="file">
      <v-icon @click="file = null" class="file-close">mdi-close</v-icon>
      <pre v-if="file" class="file-content">{{ file }}</pre>
    </div>
    <v-treeview
      :active.sync="active"
      :items="newArray"
      activatable
      color="white"
      item-key="sha"
      open-on-click
      :key="componentKey"
      hoverable
    >
      <template v-slot:label="{ item }">
        <div @click="loadContent(item)">
          <v-icon>
            {{
              item.type == "file" || item.type == "blob"
                ? "mdi-file"
                : "mdi-folder"
            }}</v-icon
          >
          {{ item.name ? item.name : item.path }}
        </div>
      </template>
    </v-treeview>
  </div>
</template>
<script>
import { requests } from "@/api/requests.js";
export default {
  name: "TreeExplorer",
  props: ["repo", "user", "repoRoot"],
  data: () => ({
    actual: [],
    file: null,
    active: [],
    index: null,
    newArray: [],
    componentKey: 0,
    open: [],
  }),
  async created() {
    this.reRender();
    this.newArray = this.repoRoot;
    for (var each of this.newArray) {
      if (each.type == "dir" || each.type == "tree") {
        each.children = [];
        // let index = this.newArray.indexOf(each);
        await this.loadContent(each);
        if (this.actual.length != 0) {
          each.children = this.actual;
          this.actual = [];
        }
      }
    }
    this.reRender();
  },
  computed: {
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0].sha;

      return this.newArray.find((repoId) => repoId.sha === id);
    },
  },
  methods: {
    async loadContent(item) {
      this.reRender();
      if (item.type == "file") {
        await requests
          .get_file(item.git_url)
          .then((data) => (this.file = data));
      }
      if (item.type == "dir") {
        item.children = [];
        await requests.get_dir(item.git_url).then((data) => {
          (this.actual = data), (item.children = data);
        });
      }
      if (item.type == "tree") {
        item.children = [];
        await requests.get_dir(item.url).then((data) => {
          (this.actual = data), (item.children = data);
        });
      }
      if (item.type == "blob") {
        await requests.get_blob(item.url).then((data) => (this.file = data));
      }

      // this.reRender();
    },
    reRender() {
      this.componentKey += 1;
    },
  },
  watch: {
    repo() {
      this.reRender();
    },
    repoRoot() {
      this.reRender();
    },
  },
};
</script>
<style scoped>
.file-popup {
  position: absolute;
  z-index: 1;
  background-color: black;
  padding: 24px;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: scroll;
}
.file-content {
  font-family: monospace, monospace;
}
.file-close {
  float: right;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #000000;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  background-color: #f5f5f5;
}
</style>
