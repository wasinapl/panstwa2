<template>
  <div class="p-m-3">
    <div class="p-grid" style="margin: 0px;">
      <div class="p-col-fixed bor" style="width: 30px;">#</div>
      <div
        class="p-col bor"
        v-for="category in store.state.categories"
        :key="category.id"
      >
        {{ category.name }}
      </div>
      <div class="p-col-fixed bor" style="width: 100px;">pkt</div>
    </div>
    <div class="p-grid" style="height: 50px; margin: 0px;" v-for="n in 10" :key="n">
      <div class="p-col-fixed bor" style="width: 30px;">{{ n }}</div>
      <div
        class="p-col bor"
        v-for="category in store.state.categories"
        :key="category.id"
      ></div>
      <div class="p-col-fixed bor" style="width: 100px;"></div>
    </div>
    <div class="p-grid" style="height: 50px; margin: 0px;">
      <div class="p-col-fixed" style="width: 30px;"></div>
      <div
        class="p-col"
        v-for="category in store.state.categories"
        :key="category.id"
      ></div>
      <div class="p-col-fixed bor" style="width: 100px;">100</div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "Table",
  setup() {
    const store = inject("store");

    return { store };
  },
};
</script>

<style scoped>
.bor {
  border: 1px solid #383838;
}
</style>
