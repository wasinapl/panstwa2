<template>
  <div class="p-m-3" style="position: relative; height: 100%">
    <Settings />
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

#button {
  position: absolute;
  bottom: 5%;
  right: 45%
}
</style>
