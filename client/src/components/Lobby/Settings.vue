<template>
  <div>
    <div class="p-grid p-jc-center">
      <div class="p-col-2">
        <h3>Rundy: {{ options.rounds }}</h3>
        <Slider v-model="options.rounds" :min="1" :max="15" />
      </div>
      <div class="p-col-2">
        <h3>Czas: {{ options.time }}</h3>
        <Slider v-model="options.time" :min="10" :step="5" :max="120" />
      </div>
    </div>
    <div class="p-grid p-jc-center">
      <div class="p-col-8">
        <h3 style="text-align: center;">Kategorie:</h3>
        <div class="cat-container">
          <transition-group name="fade">
            <Chip
              v-for="category in avalCat || []"
              :key="category._id"
              :label="category.name"
              class="chip noselect p-mr-2 p-mb-2"
              :removable="category.custom"
              @remove="removeCat(category._id)"
              :class="{ selected: category.selected }"
              @click="selectCat(category._id)"
            />
          </transition-group>
          <InputText
            class="p-mb-2"
            v-if="addCat"
            type="text"
            v-model="newCat"
            v-on:keyup.enter="addCatt"
            v-tooltip.bottom="'Wciśnij Enter ady dodać.'"
          />
          <Button
            v-if="!addCat"
            icon="pi pi-plus"
            class="p-button-rounded p-mb-2"
            style="margin-left: 5px;"
            @click="addCat = !addCat"
          />
          <Button
            v-if="addCat"
            icon="pi pi-times"
            class="p-button-rounded p-button-danger p-mb-2"
            style="margin-left: 5px;"
            @click="addCat = !addCat"
          />
        </div>
      </div>
    </div>
    <div class="p-grid p-jc-center">
      <div class="p-col-3 cat-container">
        <InputText
          id="link"
          type="text"
          class="p-inputtext-sm p-mr-1"
          modelValue="http://localhost:8080/#/room?id=casnkjd"
          readonly
        />
        <Button
          id="button"
          label="Kopiuj link"
          class="p-button-warning p-button-sm"
          @click="copyLink"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "primevue/slider";
import Button from "primevue/button";
import Chip from "./Chip";
import InputText from "primevue/inputtext";
import { v4 as uuidv4 } from "uuid";
import { ref, reactive, inject, onMounted } from "vue";

export default {
  name: "Settings",
  components: { Slider, Chip, Button, InputText },
  setup() {
    const socket = inject("socket");
    const store = inject("store");
    const options = reactive({
      rounds: 5,
      time: 50,
      categories: [],
    });
    const avalCat = ref([]);
    const newCat = ref("");
    const addCat = ref(false);

    onMounted(() => {
      socket.emit("getCategories", (res) => {
        res.forEach((el) => {
          el.selected = false;
        });
        avalCat.value = res;
      });
    });

    const selectCat = (id) => {
      let cat = avalCat.value.find((el) => el._id == id);
      cat.selected = !cat.selected;
      options.categories.push(cat);
    };

    const addCatt = () => {
      const newCategory = {
        _id: uuidv4(),
        name: newCat.value,
        selected: true,
        custom: true,
      };
      avalCat.value.push(newCategory);
      options.categories.push(newCategory);
      newCat.value = "";
      addCat.value = false;
    };

    const removeCat = (id) => {
      const index = avalCat.value.findIndex((el) => el._id == id);
      avalCat.value.splice(index, 1);
    };

    const copyLink = () => {
      const input = document.getElementById("link");
      input.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
      } catch (err) {
        console.log("błąd kopiowania");
      }
    };

    return {
      options,
      avalCat,
      selectCat,
      newCat,
      addCat,
      addCatt,
      removeCat,
      copyLink,
    };
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chip {
  cursor: pointer;
}

.cat-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
}

.selected {
  background-color: rgb(100, 181, 246);
  color: black;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
