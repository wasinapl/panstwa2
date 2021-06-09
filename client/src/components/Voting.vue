<template>
  <div class="p-m-2">
    <div id="btn-set">
      <Button
        v-for="category in store.state.categories"
        :key="category.id"
        :label="category.name"
        :class="
          category.id == activeIndex
            ? 'p-button-outlined'
            : 'p-button-raised p-button-text'
        "
        @click="activeIndex = category.id"
      />
    </div>
    <div id="tabs" class="p-mt-2">
      <div class="p-grid">
        <div class="p-col-3" @click="nextCat('-')">
          <i
            class="pi pi-angle-left center btn"
            style="fontSize: 2rem; height: 100%"
          ></i>
        </div>
        <div class="p-col-6">
          <div class="tab" v-for="n in 7" :key="n">
            <div class="p-grid">
              <div class="p-col-fixed" style="width: 100px">
                <div class="p-container">
                  <div class="player" style="position: relative">
                    <Avatar
                      image="https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=Gray01&clotheType=Overall&eyeType=Dizzy&eyebrowType=FlatNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=BrownDark&hatColor=Blue02&mouthType=ScreamOpen&skinColor=Yellow&topType=WinterHat3"
                      class="p-mx-2"
                      size="large"
                    />
                    <h4 class="p-m-1">Player{{ n }}</h4>
                  </div>
                </div>
              </div>
              <div class="p-col center">
                <h3>słowo</h3>
              </div>
              <div class="p-col center">
                <Button icon="pi pi-check" class="p-button-rounded" />
              </div>
              <div class="p-col center">
                <i class="pi pi-check" v-for="n in 4" :key="n"></i>
                <i class="pi pi-times" v-for="n in 1" :key="n"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="p-col-3" @click="nextCat('+')">
          <i
            class="pi pi-angle-right center btn"
            style="fontSize: 2rem; height: 100%"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import ProgressBar from "primevue/progressbar";

import { ref, inject } from "vue";

export default {
  name: "Voting",
  components: { Button, Avatar, InputText, ProgressBar },
  setup() {
    const activeIndex = ref(1);
    const store = inject("store");

    const nextCat = (dir) => {
      if (dir === "+") {
        activeIndex.value++;
        if (activeIndex.value > 5) activeIndex.value = 1;
      } else if (dir === "-") {
        activeIndex.value--;
        if (activeIndex.value < 1) activeIndex.value = 5;
      }
    };

    return { activeIndex, store, nextCat };
  },
};
</script>

<style scoped>
#btn-set {
  display: flex;
  justify-content: center;
}
#tabs {
  padding-top: 20px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  border: 1px solid;
  border-color: #64b5f6;
  cursor: pointer;
}
</style>
