<template>
  <div>
    <h2 style="text-align: center;">Gracze:</h2>
    <div class="p-container">
      <div
        class="player"
        v-for="player in players"
        :key="player.id"
        style="position: relative"
      >
        <Avatar :image="player.avatar" class="p-mx-2" size="xlarge" />
        <h4 class="p-m-1">{{ player.name }}</h4>
        <transition name="fade">
          <i v-if="player.ready" class="pi pi-check ready"></i>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive } from "vue";
import Avatar from "primevue/avatar";

export default {
  name: "PlayerList",
  components: { Avatar },
  setup() {
    const store = inject("store");
    const socket = inject("socket");

    const players = reactive(
      store.state.players.map((player) => {
        let ply = JSON.parse(JSON.stringify(player));
        ply.ready = 0;
        return ply;
      })
    );

    socket.on("voteReady", id => {
      const index = players.findIndex(pl => pl.id == id);
      console.log(index)
      players[index].ready = true;
    })

    return { players };
  },
};
</script>

<style></style>
