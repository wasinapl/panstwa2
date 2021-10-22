// @ts-nocheck
import { reactive, readonly } from "vue";

const state = reactive({
  player: {},
  players: [],
  options: {},
  categories: [],
  isAdmin: false,
});

const methods = {
  setUserInfo(name, avatar) {
    state.player.name = name;
    state.player.avatar = avatar;
  },
  setAdmin(isAdmin) {
    state.isAdmin = isAdmin;
  },
  setPlayers(players) {
    state.players = players;
  },
  setPlayerId(id){
    state.player.id = id;
  },
  setReadyStatus(playerID){
    const player = state.players.find(p => p.id === playerID);
    player.ready = !player.ready;
  },
  setOptions(options) {
    state.options = options;
  },
  setRounds(rounds) {
    state.options.rounds = rounds;
  },
  setTime(time) {
    state.options.time = time;
  },

  getCategories(){
    return state.options.categories;
  },
  getCategoriesCount(){
    return state.options.categories.length;
  }
};


export default {
  state: readonly(state),
  methods,
};
