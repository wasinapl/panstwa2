<template>
  <div class="p-m-2">
    <div id="btn-set">
      <Button
        v-for="(category, i) in store.state.options.categories"
        :key="category._id"
        :label="category.name"
        :class="
          i == activeIndex
            ? 'p-button-outlined'
            : 'p-button-raised p-button-text'
        "
        @click="activeIndex = i"
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
          <div
            class="tab"
            v-for="player in store.state.players"
            :key="player.id"
          >
            <div class="p-grid">
              <div class="p-col-fixed" style="width: 100px">
                <div class="p-container">
                  <div class="player" style="position: relative">
                    <Avatar
                      :image="player.avatar"
                      class="p-mx-2"
                      size="large"
                    />
                    <h4 class="p-m-1">{{ player.name }}</h4>
                  </div>
                </div>
              </div>
              <div class="p-col center">
                <h3>{{ words[player.id][activeIndex].word }}</h3>
              </div>
              <div class="p-col center">
                <Button
                  v-if="
                    !words[player.id][activeIndex].empty &&
                      votesState[player.id][activeIndex]
                  "
                  icon="pi pi-check"
                  class="p-button-rounded"
                  @click="vote(player.id)"
                />
                <Button
                  v-if="
                    !words[player.id][activeIndex].empty &&
                      !votesState[player.id][activeIndex]
                  "
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger"
                  @click="vote(player.id)"
                />
              </div>
              <div class="p-col center">
                <i
                  class="pi pi-check"
                  v-for="n in words[player.id][activeIndex].rating.good"
                  :key="n"
                ></i>
                <i
                  class="pi pi-times"
                  v-for="n in words[player.id][activeIndex].rating.bad"
                  :key="n"
                ></i>
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
    <PlayersList  style="margin-bottom: 20px; margin-top: 20px"/>
    <div class="p-d-flex p-jc-center" id="btn-container">
      <Button label="Gotowe" :disabled="readyStatus" @click="ready" />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import ProgressBar from "primevue/progressbar";
import PlayersList from "./Voting/PlayersList.vue";

import { ref, reactive, inject } from "vue";

export default {
  name: "Voting",
  components: { Button, Avatar, InputText, ProgressBar, PlayersList },
  props: ["words"],
  setup(props, context) {
    const activeIndex = ref(0);
    const store = inject("store");
    const socket = inject("socket");
    const words = reactive(props.words);
    const readyStatus = ref(false);

    const votes = {};
    Object.keys(props.words).forEach((player) => {
      votes[player] = new Array(store.methods.getCategoriesCount()).fill(true);
    });

    const votesState = reactive(votes);

    const nextCat = (dir) => {
      if (dir === "+") {
        if (++activeIndex.value > store.methods.getCategoriesCount() - 1)
          activeIndex.value = 0;
      } else if (dir === "-") {
        if (--activeIndex.value < 0)
          activeIndex.value = store.methods.getCategoriesCount() - 1;
      }
    };

    const vote = (player) => {
      votesState[player][activeIndex.value] = !votesState[player][
        activeIndex.value
      ];
      socket.emit("vote", {
        player,
        category: activeIndex.value,
        value: votesState[player][activeIndex.value],
      });
    };

    const ready = () => {
      readyStatus.value = true;
      socket.emit("voteReady");
    };

    socket.on("vote", ({ player, category, value }) => {
      if (value) {
        words[player][category].rating.good++;
        words[player][category].rating.bad--;
      } else {
        words[player][category].rating.good--;
        words[player][category].rating.bad++;
      }
    });

    return {
      activeIndex,
      store,
      words,
      votesState,
      readyStatus,
      nextCat,
      vote,
      ready,
    };
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
