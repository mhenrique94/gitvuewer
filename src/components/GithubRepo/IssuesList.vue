<template>
  <v-container class="issues-list">
    <v-card class="il-card" tile v-for="item in issues" :key="item.id">
      <v-list-item three-line>
        <v-list-item-content>
          <a :href="item.html_url" class="ilc-line">
            <v-list-item-title class="ilcl-title">{{
              item.title
            }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.assignee }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ item.created_at }}
            </v-list-item-subtitle>
          </a>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <div class="noissues-disclaimer" v-if="issues.length == 0">
      <v-icon x-large> mdi-alert-circle </v-icon>
      <p>Nenhuma issue aberta nesse repositório.</p>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "IssuesList",
  props: ["issues"],
};
</script>
<style scoped>
.il-card {
  margin: 8px auto;
  background-color: #000000;
  border-bottom: solid 1px #1a1a1a;
  padding: 8px 0;
}
.ilc-line {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}
.ilcl-title {
  display: contents;
  color: rgb(232, 228, 228);
  text-decoration: none;
}
.noissues-disclaimer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 8px 64px;
}
</style>
