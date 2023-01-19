<template>
  <v-card color="black lighten-2" dark>
    <v-card-title class="text-h5 black lighten-3">
      Procure por repositórios
    </v-card-title>

    <v-card-text>
      <v-autocomplete
        v-model="user"
        :items="reposlist"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="name"
        item-value="API"
        label="Buscar"
        placeholder="Digite para buscar"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="user" class="black lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.key"></v-list-item-title>
            <v-list-item-subtitle v-text="field.value"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
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
      if (_searchDebounce) {
        clearTimeout(_searchDebounce);
      }
      _searchDebounce = setTimeout(() => {
        // a ser substituido pela chamada real da api
        this.reposlist = [{ name: "joão" }, { name: "marcio" }];
        _searchDebounce = null;
        this.isLoading = false;
      }, 500);
    },
  },
  computed: {
    fields() {
      if (!this.user) return [];

      return Object.keys(this.user).map((key) => {
        return {
          key,
          value: this.user[key] || "n/a",
        };
      });
    },
  },

  watch: {
    search() {
      console.log();
      // Items have already been loaded
      if (this.reposlist.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;
      this.searchDebounced();
      // Lazily load input items
      // fetch("https://api.publicapis.org/entries")
      //   .then((res) => res.json())
      //   .then((res) => {
      //     const { count, entries } = res;
      //     this.count = count;
      //     this.reposlist = entries;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => (this.isLoading = false));

      // this.reposlist = [{ name: "joão" }, { name: "marcio" }];
      // this.isLoading = false;
    },
  },
};
</script>
