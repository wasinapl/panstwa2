<template>
  <div class="p-m-3" id="container">
    <div class="p-grid">
      <div class="p-col-fixed" style="width:350px">
        <Knob class="p-mx-auto" v-model="time" :min="0" :max="60" readonly />
      </div>
      <div class="p-col" v-for="player in players" :key="player.id">
        <div class="p-container">
          <div class="player" style="position: relative">
            <Avatar :image="player.avatar" class="p-mx-2" size="xlarge" />
            <h4 class="p-m-1">{{ player.name }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div id="category">
      <div
        class="p-grid"
        v-for="(category, i) in store.state.options.categories"
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
                :disabled="time < 1"
                @keyup="check(i)"
                @focus="focus(i)"
                @blur="blur(i)"
              />
            </div>
          </div>
        </div>
        <div
          class="p-col status-container"
          v-for="player in players"
          :key="player.id"
        >
          <i
            v-if="statuses[category._id][player.id] == 0"
            class="pi pi-circle-off status-empty"
            style="fontSize: 1.8rem"
          ></i>
          <i
            v-if="statuses[category._id][player.id] == 1"
            class="pi pi-pencil status-write"
            style="fontSize: 1.8rem"
          ></i>
          <i
            v-if="statuses[category._id][player.id] == 2"
            class="pi pi-check-circle status-done"
            style="fontSize: 1.8rem"
          ></i>
        </div>
      </div>
    </div>
    <div class="p-d-flex p-jc-center" id="btn-container">
      <Button label="Gotowy" :disabled="time < 1 || readyStatus" @click="ready"/>
    </div>
  </div>
</template>

<script>
import Knob from "primevue/knob";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref, reactive, inject, computed } from "vue";

export default {
  name: "Writing",
  components: { Knob, Avatar, InputText, Button },
  props: ["letter"],
  setup(props, context) {
    const store = inject("store");
    const socket = inject("socket");
    const time = ref(store.state.options.time);
    const letter = props.letter;
    const readyStatus = ref(false);
    const words = ref(
      new Array(store.state.options.categories.length).fill("")
    );
    const statuses = reactive({});

    store.state.options.categories.forEach((category) => {
      statuses[category._id] = {};
      store.state.players.forEach((player) => {
        statuses[category._id][player.id] = 0;
      });
    });

    const timer = () => {
      if (time.value > 0) {
        time.value--;
        setTimeout(timer, 1000);
      }
      else{
        socket.emit('words', words.value)
      }
    };

    const players = computed(() => {
      let players = [];
      players.push(...store.state.players);
      let index = players.findIndex((pl) => pl.id == store.state.player.id);
      players.splice(index, 1);
      return players;
    });

    const check = (i) => {
      if (words.value[i].charAt(0).toLowerCase() != props.letter.toLowerCase())
        words.value[i] = "";
    };

    const focus = (i) => {
      socket.emit("setStatus", {
        category: store.state.options.categories[i]._id,
        player: store.state.player.id,
        status: 1,
      });
    };

    const blur = (i) => {
      socket.emit("setStatus", {
        category: store.state.options.categories[i]._id,
        player: store.state.player.id,
        status: words.value[i].length > 1 ? 2 : 0,
      });
    };

    const ready = () => {
      readyStatus.value = true;
      socket.emit("writingReady");
    }

    socket.on('setStatus', ({category, player, status}) => {
      statuses[category][player] = status;
    })
    socket.on('timeChange', () => {
      time.value = 10;
    })

    timer();

    return {
      time,
      store,
      letter,
      words,
      players,
      statuses,
      check,
      focus,
      blur,
      ready,
      readyStatus
    };
  },
};
</script>

<style>
.status-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

#container {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  flex-direction: column;
  justify-content: flex-start;
  -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1; /* OLD - Firefox 19- */
  -webkit-flex: 1; /* Chrome */
  -ms-flex: 1; /* IE 10 */
  flex: 1; /* NEW, */
}

#btn-container {
  height: 40px;
  margin-bottom: 20px;
}
</style>
