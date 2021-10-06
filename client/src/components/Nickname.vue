<template>
  <div class="p-d-flex p-flex-column p-ai-center">
    <h1 id="name">PAŃSTWA I MIASTA</h1>
    <div id="avatar">
      <img
        class="p-mx-auto p-d-block"
        :src="avatar"
        alt="avatar"
        style="height: 200px"
      />
      <Button
        icon="pi pi-refresh"
        class="p-button-rounded p-button-text"
        id="refresh"
        @click="randAvatar"
      />
    </div>

    <div>
      <div class="p-mt-4">
        <span class="p-float-label">
          <InputText id="username" type="text" v-model="name" />
          <label for="username">Nazwa użytkownika</label>
        </span>
      </div>
    </div>
    <div class="p-mt-3">
      <Button
        v-if="props.newGame"
        class="p-d-block p-mx-auto p-button-lg"
        label="NOWY GRA"
        @click="newGame"
      />
      <Button
        v-if="!props.newGame"
        class="p-d-block p-mx-auto p-button-lg"
        label="DOŁĄCZ"
        @click="joinGame"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { AvatarGenerator } from "random-avatar-generator";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NickName",
  components: {
    Button,
    InputText,
  },
  props: {
    newGame: { default: true },
  },
  setup(props, { emit }) {
    const socket = inject("socket");
    const store = inject("store");
    const router = useRouter();
    const avatar = new ref("");
    const name = new ref("");
    const generator = new AvatarGenerator();
    avatar.value = generator.generateRandomAvatar();

    const randAvatar = () => {
      avatar.value = generator.generateRandomAvatar();
    };

    const newGame = () => {
      store.methods.setUserInfo(name, avatar);
      store.methods.setAdmin(true);
      socket.emit(
        "createRoom",
        { name: name.value, avatar: avatar.value },
        (id) => {
          router.push({
            name: "Room",
            query: {
              id,
            },
          });
        }
      );
    };

    const joinGame = () => {
      store.methods.setName(name);
      emit("join");
    };

    return { avatar, randAvatar, newGame, name, joinGame, props };
  },
};
</script>

<style>
#name {
  color: white;
  text-align: center;
  font-size: 50px;
}

#avatar {
  position: relative;
}

#refresh {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
