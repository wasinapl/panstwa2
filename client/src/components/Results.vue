<template>
  <div>
    <DataTable :value="results" responsiveLayout="scroll">
      <Column field="name" header="Nazwa"></Column>
      <Column field="score" header="Wynik"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "Results",
  props: ["results"],
  components: {DataTable, Column},
  setup() {
    return {};
  },
};
</script>

<style></style>
