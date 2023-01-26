<template>
  <v-card color="lighten-2 main-container" dark max-width="1000">
    <div class="search-area">
      <v-card-text>
        <v-autocomplete
          v-model="user"
          :items="entries"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="login"
          item-value="API"
          label="Entre com o nome de usuário"
          placeholder="Digite para buscar"
          prepend-icon="mdi-account-search"
          filled
        >
          <template v-slot:item="data">
            <v-list-item-avatar>
              <v-img
                :src="data.item.avatar_url"
                aspect-ratio="1"
                width="32px"
                height="42px"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.login"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!user" color="grey darken-3" @click="user = null">
          Clear
          <v-icon right> mdi-close-circle </v-icon>
        </v-btn>
      </v-card-actions>
    </div>
    <v-divider></v-divider>
    <v-expansion-panels v-if="user" :value="0" accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3>Perfil de {{ user }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="mc-profile">
            <div class="mcp-overview">
              <v-img :src="user_data.avatar_url" class="pic"></v-img>
              <div>@{{ user }}</div>
              <div class="btn-container">
                <div disabled class="btn-count">
                  <div>{{ user_data.followers }}</div>
                  <div class="bc-label">Seguidores</div>
                </div>
                <div disabled class="btn-count">
                  <div>{{ user_data.following }}</div>
                  <div class="bc-label">Seguindo</div>
                </div>
              </div>
            </div>
            <v-divider vertical></v-divider>
            <v-container fluid class="mcp-details">
              <h2>Detalhes de {{ user }}</h2>
              <hr />
              <h3>{{ user_data.name }}</h3>
              <div>{{ user_data.bio }}</div>
              <div>{{ user_data.company }}</div>
              <div>{{ user_data.location }}</div>
              <div>Membro desde {{ user_data.created_at | formatDate }}</div>
              <div>Repositórios: {{ user_data.public_repos }}</div>
            </v-container>
          </v-container>
          <v-divider v-if="user"></v-divider>
          <v-container class="issues-selector">
            <v-row align="center">
              <v-col cols="12">
                <v-select
                  v-model="repo"
                  :items="reposlist"
                  item-text="name"
                  :menu-props="{ top: true, offsetY: true }"
                  label="Selecione o repositório"
                  :loading="isLoading"
                  return-object
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="repo">
        <v-expansion-panel-header> <h3>Issues</h3> </v-expansion-panel-header>
        <v-expansion-panel-content>
          <IssuesList :issues="issues" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="repo">
        <v-expansion-panel-header>
          <h3>Navegar no código de {{ repo.name }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <NavigationDrawer
            class="suspendMenu"
            @show="
              (receives) => {
                switchContent = receives;
              }
            "
          />
          <FileExplorer
            v-if="switchContent == 'listShow'"
            :repoRoot="repoRoot"
            :user="user"
          />
          <TreeExplorer
            v-if="switchContent == 'treeShow'"
            :user="user"
            :repo="repo"
            :repoRoot="repoRoot"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script>
import { requests } from "@/api/requests.js";
import IssuesList from "./GithubRepo/IssuesList.vue";
import FileExplorer from "./GithubRepo/FileExplorer.vue";
import TreeExplorer from "./GithubRepo/TreeExplorer.vue";
import NavigationDrawer from "./GithubRepo/NavigationDrawer.vue";
import moment from "moment";
import Vue from "vue";

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

let _searchDebounce = null;
export default {
  name: "GithubRepo",
  components: { IssuesList, FileExplorer, TreeExplorer, NavigationDrawer },
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    user: null,
    search: null,
    reposlist: [],
    user_data: null,
    repo: null,
    issues: null,
    panel: [0],
    repoRoot: [],
    switchContent: "treeShow",
  }),
  mounted() {
    //for api mock
    // this.user = "mhenrique94";
  },
  methods: {
    searchDebounced() {
      this.isLoading = true;
      if (_searchDebounce) {
        clearTimeout(_searchDebounce);
      }
      _searchDebounce = setTimeout(async () => {
        // Lazily load input items
        const data = await requests.search_users(this.search);
        this.entries = data.items;
        this.isLoading = false;
        _searchDebounce = null;
      }, 1000);
    },
  },

  watch: {
    search() {
      if (this.search == "") {
        this.entries = [];
        this.issues = null;
        return;
      }
      // Items have already been loaded
      if (this.entries.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;
      this.searchDebounced();
    },
    async user() {
      if (!this.user) {
        this.search = null;
        this.isLoading = false;
      }
      this.isLoading = true;
      this.user_data = await requests.get_user(this.user);
      this.reposlist = await requests.get_repos(this.user);
      //user/repository mock
      // this.user_data = require("@/api/mock/user.json");
      // this.reposlist = require("@/api/mock/reposlist.json");
      this.isLoading = false;
    },
    async repo() {
      this.issues = await requests.get_issues(this.user, this.repo.name);
      this.repoRoot = await requests.get_files(this.user, this.repo.name);
      //issues/fileexplorer mock
      // this.issues = require("@/api/mock/issues.json");
      // this.repoRoot = require("@/api/mock/contents.json");
    },
  },
};
</script>
<style scoped>
.main-container {
  margin: 24px auto;
}
.search-area {
  display: flex;
  align-items: baseline;
  padding: 0 32px;
}
.mc-profile {
  display: flex;
  gap: 32px;
  padding: 32px;
}
.mcp-overview,
.mcp-details {
  display: flex;
  flex-direction: column;
}
.mcp-overview {
  width: 30%;
  align-items: center;
}
.mcp-overview > .pic {
  width: 100%;
  max-width: 132px;
}
.btn-container {
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
.btn-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  border-radius: 4px;
  margin: 17px auto;
}
.bc-label {
  font-size: smaller;
}
.mcp-details {
  padding: 0;
}
h2 {
  margin-bottom: 8px;
}
h3 {
  margin: 8px 0;
}
.issues-selector {
  display: flex;
  padding: 32px;
}
</style>
