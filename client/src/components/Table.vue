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
    <div
      class="p-grid"
      style="height: 50px; margin: 0px;"
      v-for="n in 10"
      :key="n"
    >
      <div class="p-col-fixed bor" style="width: 30px;">{{ n }}</div>
      <div class="p-col bor" v-for="(word, i) in rounds.words" :key="i">
        {{ word.word }}
        <transition name="fade">
          <span style="float:right;" v-if="word.points">
            {{ word.points }}
          </span>
        </transition>
      </div>
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
import { reactive, inject } from "vue";

export default {
  name: "Table",
  setup() {
    const store = inject("store");
    const rounds = reactive({
      words: [
        { word: "test", points: undefined },
        { word: "test", points: undefined },
        { word: "test", points: undefined },
        { word: "test", points: undefined },
        { word: "test", points: undefined },
      ],
      round: 1,
    });

    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        rounds.words[i - 1].points = 15;
      }, 700 * i);
    }

    return { store, rounds };
  },
};
</script>

<style scoped>
.bor {
  border: 1px solid #383838;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
