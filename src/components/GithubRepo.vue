<template>
  <v-card color="black lighten-2" dark>
    <v-card-title class="text-h5 black lighten-3">
      Procure por repositórios
    </v-card-title>

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
        return-object
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
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!user" color="grey darken-3" @click="user = null">
        Clear
        <v-icon right> mdi-close-circle </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { requests } from "@/api/requests.js";

let _searchDebounce = null;
export default {
  name: "GithubRepo",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    user: null,
    search: null,
    reposlist: [],
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
  },
};
</script>
