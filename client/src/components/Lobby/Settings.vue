<template>
  <div id="container">
    <div class="p-grid p-jc-center">
      <div class="p-col-2">
        <h3>Rundy: {{ options.rounds }}</h3>
        <Slider
          v-model="options.rounds"
          :min="1"
          :max="15"
          :disabled="!store.state.isAdmin"
        />
      </div>
      <div class="p-col-2">
        <h3>Czas: {{ options.time }}</h3>
        <Slider
          v-model="options.time"
          :min="10"
          :step="5"
          :max="120"
          :disabled="!store.state.isAdmin"
        />
      </div>
    </div>
    <div class="p-mb-3">
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
          v-if="!addCat && store.state.isAdmin"
          icon="pi pi-plus"
          class="p-button-rounded p-mb-2"
          style="margin-left: 5px;"
          @click="addCat = !addCat"
        />
        <Button
          v-if="addCat && store.state.isAdmin"
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-mb-2"
          style="margin-left: 5px;"
          @click="addCat = !addCat"
        />
      </div>
    </div>
    <div v-if="store.state.isAdmin">
      <div class="cat-container">
        <InputText
          id="link"
          type="text"
          class="p-inputtext-sm p-mr-1"
          :modelValue="link"
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
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Settings",
  components: { Slider, Chip, Button, InputText },
  setup() {
    const socket = inject("socket");
    const store = inject("store");
    const route = useRoute();
    const options = reactive({
      rounds: 5,
      time: 50,
      categories: [],
    });
    const avalCat = ref([]);
    const newCat = ref("");
    const addCat = ref(false);
    const link =
      process.env.NODE_ENV === "development"
        ? `http://localhost:8080/#/room?id=${route.query.id}`
        : `http://panstwamiasta.online/#/room?id=${route.query.id}`;

    onMounted(() => {
      socket.emit("getCategories", (res) => {
        res.forEach((el) => {
          el.selected = false;
        });
        avalCat.value = res;
      });
    });

    const selectCat = (id) => {
      if (!store.state.isAdmin) return;
      let cat = avalCat.value.find((el) => el._id == id);
      if (!cat.selected) {
        options.categories.push(cat);
      } else {
        let index = options.categories.findIndex((el) => el._id == id);
        options.categories.splice(index, 1);
      }
      cat.selected = !cat.selected;
      emitCat();
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
      emitCat();
    };

    const removeCat = (id) => {
      if (!store.state.isAdmin) return;
      let index = avalCat.value.findIndex((el) => el._id == id);
      avalCat.value.splice(index, 1);

      index = options.categories.findIndex((el) => el._id == id);
      options.categories.splice(index, 1);
      emitCat();
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

    if (!store.state.isAdmin) {
      socket.on("optionsChange", (opt) => {
        options.time = opt.time;
        options.rounds = opt.rounds;
      });
      socket.on("avalCatChange", (aval) => {
        avalCat.value = aval;
      });
    }

    watch(
      () => options,
      (options, prevOptions) => {
        if (store.state.isAdmin) {
          socket.emit("optionsChange", options);
          store.methods.setOptions(options);
        }
      },
      { deep: true }
    );

    const emitCat = () => {
      socket.emit("avalCatChange", avalCat.value);
    };

    return {
      options,
      link,
      avalCat,
      store,
      newCat,
      addCat,
      selectCat,
      addCatt,
      removeCat,
      copyLink,
    };
  },
};
</script>

<style scoped>
#container {
  width: 70%;
}

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
