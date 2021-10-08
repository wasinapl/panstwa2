<template>
  <div class="p-d-flex p-flex-column  p-ai-center">
    <Settings />
    <PlayerList /><br />
    <div>
      <Button
        id="button"
        label="Gotowy"
        @click="rdy"
        :class="{ 'p-button-success': !ready, 'p-button-secondary': ready }"
      />
      <Button v-if="store.state.isAdmin" label="Start" :disabled="!allReady"  class="p-button-primary"/>
    </div>
  </div>
</template>

<script>
import Settings from "./Lobby/Settings";
import PlayerList from "./Lobby/PlayerList";
import Button from "primevue/button";
import { ref, inject } from "vue";

export default {
  name: "Lobby",
  components: {
    Settings,
    PlayerList,
    Button,
  },
  setup() {
    const socket = inject("socket");
    const store = inject("store");
    const allReady = ref(false);
    const ready = ref(false);

    const rdy = () => {
      ready.value = !ready.value;
      socket.emit("playerReady");
    };

    socket.on("allReady", (state) => {
      allReady.value = state;
    })

    return { ready, rdy, store, allReady };
  },
};
</script>

<style scoped></style>
