<template>
  <div style="width: 100%; height: 100%">
    <Lobby v-if="view === 'lobby'" />
    <RandomLetter
      v-if="view === 'random'"
      :letter="'X'"
      @done="view = 'writing'"
    />
    <Writing v-if="view === 'writing'" :letter="'K'" />
    <Voting v-if="view === 'voting'" />
    <Table v-if="view === 'table'" />
    <Nickname :newGame="false" @join="join" v-if="view === 'nickname'" />
  </div>
</template>

<script>
import Lobby from "../components/Lobby";
import RandomLetter from "../components/RandomLetter";
import Writing from "../components/Writing";
import Voting from "../components/Voting";
import Table from "../components/Table";
import Nickname from "../components/Nickname";
import { useRoute, useRouter } from "vue-router";
import { ref, inject } from "vue";

export default {
  name: "Room",
  components: {
    Lobby,
    RandomLetter,
    Writing,
    Voting,
    Table,
    Nickname,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const socket = inject("socket");
    const store = inject("store");
    const view = ref("");

    socket.emit("roomExist", route.query.id, (res) => {
      if (!res.ok)
        router.push({
          name: "Home",
        });
      else if (res.admin) {
        join();
      } else {
        view.value = "nickname";
        store.methods.setAdmin(res.admin);
      }
    });

    socket.on("newPlayer", players => {
      console.log(players)
      store.methods.setPlayers(players);
    })
    socket.on("playerLeft", players => {
      store.methods.setPlayers(players);
    })

    const join = () => {
      socket.emit(
        "joinRoom",
        { id: route.query.id, player: store.state.player },
        (res) => {
          store.methods.setOptions(res.options);
          store.methods.setPlayers(res.players);
          view.value = "lobby";
        }
      );
    };

    console.log(route.query.id);

    return { view, join };
  },
};
</script>

<style></style>
