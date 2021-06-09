<template>
  <div style="width: 100%; height: 100%">
    <Lobby v-if="view === 'lobby'" />
    <RandomLetter v-if="view === 'random'" :letter="'X'" @done="view = 'writing'"/>
    <Writing v-if="view === 'writing'" :letter="'K'" />
    <Voting v-if="view === 'voting'" />
    <Table v-if="view === 'table'" />
  </div>
</template>

<script>
import Lobby from "../components/Lobby";
import RandomLetter from "../components/RandomLetter";
import Writing from "../components/Writing";
import Voting from "../components/Voting";
import Table from "../components/Table";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "Room",
  components: {
    Lobby,
    RandomLetter,
    Writing,
    Voting,
    Table
  },
  setup() {
    const route = useRoute();
    const view = ref("table");
    console.log(route.query.id);

    return { view };
  },
};
</script>

<style></style>
