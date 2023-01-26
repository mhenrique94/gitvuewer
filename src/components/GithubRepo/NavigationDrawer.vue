<template>
  <v-container>
    <v-navigation-drawer floating permanent width="100%">
      <v-list dense width="100%">
        <v-list-item-group
          v-model="selectedItem"
          class="listItemGroup"
          width="100%"
        >
          <v-list-item
            @click="clickItem(item.click)"
            v-for="item in items"
            :key="item.title"
            link
            class="itemTitle"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      items: [
        {
          title: "Lista",
          icon: "mdi-format-list-bulleted",
          click: "listShow",
        },
        {
          title: "Arvore",
          icon: "mdi-file-tree",
          click: "treeShow",
        },
      ],
      selectedItem: 1,
    };
  },
  methods: {
    clickItem(selectedItem) {
      this.$emit("show", selectedItem);
    },
  },
};
</script>
<style scoped>
.listItemGroup {
  display: flex;
  /* gap: 20px; */
  padding: 0 8px;
}
.itemTitle {
  text-align: center;
}
</style>
