<template>
  <div>
    <h2 style="text-align: center;">Gracze:</h2>
    <div class="p-container">
      <div
        class="player"
        v-for="player in store.state.players"
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
import Avatar from "primevue/avatar";
import Badge from 'primevue/badge';
import { ref, inject } from "vue";

export default {
  name: "PlayerList",
  components: { Avatar, Badge },
  setup() {
    const test = ref(false);
    const store = inject('store')
    const socket = inject('socket')

    socket.on('playerReady', player => {
      store.methods.setReadyStatus(player);
    })

    return { store, test };
  },
};
</script>

<style>
.player {
  float: left;
  text-align: center;
  position: relative;
  margin-right: 10px;
}

.p-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
}

.ready {
  position: absolute;
  top: 5%;
  right: 5%;
  padding: 2px;
  border-radius: 100%;
  background: #77bb17;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
