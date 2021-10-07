<template>
  <div class="p-d-flex p-flex-column  p-ai-center">
    <Settings/>
    <PlayerList /><br />
    <Button id="button" label="Gotowy"/>
  </div>
</template>

<script>
import Settings from "./Lobby/Settings";
import PlayerList from "./Lobby/PlayerList";
import Button from "primevue/button";

export default {
  name: "Lobby",
  components: {
    Settings,
    PlayerList,
    Button,
  },
};
</script>

<style scoped>

</style>
