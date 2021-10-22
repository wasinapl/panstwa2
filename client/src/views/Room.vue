<template>
  <div style="width: 100%; height: 100%; position: relative;">
    <Lobby v-if="view === 'lobby'" />
    <RandomLetter
      v-if="view === 'random'"
      :letter="letter"
      @done="view = 'writing'"
    />
    <Writing v-if="view === 'writing'" :letter="letter" />
    <Voting v-if="view === 'voting'" :words="data.words"/>
    <Table v-if="view === 'table'" />
    <Nickname :newGame="false" @join="join" v-if="view === 'nickname'" />
    <Results v-if="view === 'results'" :results="results"/>
    <Chat v-if="view != 'nickname'"/>
  </div>
</template>

<script>
import Lobby from "../components/Lobby";
import RandomLetter from "../components/RandomLetter";
import Writing from "../components/Writing";
import Voting from "../components/Voting";
import Table from "../components/Table";
import Nickname from "../components/Nickname";
import Chat from "../components/Chat.vue";
import Results from "../components/Results.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, inject } from "vue";


export default {
  name: "Room",
  components: {
    Lobby,
    RandomLetter,
    Writing,
    Voting,
    Table,
    Nickname,
    Chat,
    Results
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const socket = inject("socket");
    const store = inject("store");
    const view = ref("");
    const letter = ref('');
    const data = reactive({words: {}});
    const results = ref([]);

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

    socket.on("newPlayer", (players) => {
      console.log(players);
      store.methods.setPlayers(players);
    });
    socket.on("playerLeft", (players) => {
      store.methods.setPlayers(players);
    });

    socket.on("startGame", (res) => {
      store.methods.setOptions(res.options);
      letter.value = res.letter;
      view.value = "random";
    });

    socket.on("voting", words => {
      data.words = words
      view.value = "voting";
    })

    socket.on("nextRound", l => {
      letter.value = l;
      view.value = "random";
    })

    socket.on("results", res => {
      results.value = res;
      view.value = "results";
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

    return { view, letter, data, results, join };
  },
};
</script>

<style></style>
