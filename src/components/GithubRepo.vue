<template>
  <v-card color="black lighten-2 main-container" dark max-width="1000">
    <v-card-title class="text-h5 black lighten-3">
      Procure por repositórios
    </v-card-title>

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
    <v-container v-if="user" class="mc-profile">
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
        <div>Membro desde {{ user_data.created_at }}</div>
        <div>Repositórios: {{ user_data.public_repos }}</div>
      </v-container>
    </v-container>
    <v-divider v-if="user"></v-divider>
    <v-container v-if="user" class="issues-selector">
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
    <IssuesList :issues="issues" v-if="user" />
  </v-card>
</template>
<script>
import { requests } from "@/api/requests.js";
import IssuesList from "./IssuesList.vue";

let _searchDebounce = null;
export default {
  name: "GithubRepo",
  components: { IssuesList },
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
  }),
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
      //user mock
      // this.user_data = require("@/assets/user.json");
      // this.reposlist = require("@/assets/reposlist.json");
      this.isLoading = false;
    },
    async repo() {
      this.issues = await requests.get_issues(this.user, this.repo.name);
      // this.issues = require("@/assets/issues.json");
    },
  },
};
</script>
<style scoped>
.main-container {
  margin: auto;
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
