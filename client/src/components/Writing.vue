<template>
  <div
    class="p-m-3"
    style="display: flex; flex-direction: column; height: 100%"
  >
    <div class="p-grid">
      <div class="p-col-fixed" style="width:350px">
        <Knob class="p-mx-auto" v-model="value" :min="0" :max="60" readonly />
      </div>
      <div class="p-col" v-for="player in store.state.players" :key="player.id">
        <div class="p-container">
          <div class="player" style="position: relative">
            <Avatar :image="player.url" class="p-mx-2" size="xlarge" />
            <h4 class="p-m-1">{{ player.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div id="category">
      <div
        class="p-grid"
        v-for="(category, i) in store.state.categories"
        :key="category.id"
      >
        <div class="p-col-fixed" style="width:350px">
          <div class="p-grid p-ai-center vertical-container">
            <div class="p-col">
              <h3>{{ category.name }}</h3>
            </div>
            <div class="p-col">
              <InputText
                type="text"
                v-model="words[i]"
                :placeholder="letter"
                @keyup="check(i)"
              />
            </div>
          </div>
        </div>
        <div
          class="p-col status-container"
          v-for="player in store.state.players"
          :key="player.id"
        >
          <i
            v-if="false"
            class="pi pi-check-circle status-done"
            style="fontSize: 1.8rem"
          ></i>
          <i
            v-if="true"
            class="pi pi-circle-off status-empty"
            style="fontSize: 1.8rem"
          ></i>
          <i
            v-if="false"
            class="pi pi-pencil status-write"
            style="fontSize: 1.8rem"
          ></i>
        </div>
      </div>
      <div class="p-grid">
          <div class="p-col">
              <Button label="Gotowy" style="margin: 0 auto; display: block;"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Knob from "primevue/knob";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref, inject } from "vue";

export default {
  name: "Writing",
  components: { Knob, Avatar, InputText, Button },
  props: ["letter"],
  setup(props, context) {
    const value = ref(60);
    const store = inject("store");
    const letter = props.letter;
    const words = ref([]);

    words.value = new Array(store.state.categories.length).fill("");

    const timer = () => {
      if (value.value > 0) {
        value.value--;
        setTimeout(timer, 1000);
      }
    };

    const check = (i) => {
      if (words.value[i].charAt(0).toLowerCase() != props.letter.toLowerCase())
        words.value[i] = "";
    };

    timer();

    window.onblur = () => console.log('blurred');

    return { value, store, letter, words, check };
  },
};
</script>

<style>
.status-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-done {
  color: #77bb17;
}
.status-write {
  color: #d1d408;
}
.status-empty {
  color: #979797;
}

#category {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
