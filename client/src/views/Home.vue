<template>
  <h1 id="name">PAŃSTWA I MIASTA</h1>
  <div id="avatar">
    <img
      class="p-mx-auto p-d-block"
      :src="avatar"
      alt="avatar"
      style="height: 200px"
    />
    <Button icon="pi pi-refresh" class="p-button-rounded p-button-text" id="refresh" @click="randAvatar"/>
  </div>

  <div class="p-grid p-jc-center p-m-3">
    <div class="p-col-2">
      <span class="p-float-label">
        <InputText id="username" type="text" v-model="value2" />
        <label for="username">Username</label>
      </span>
    </div>
  </div>

  <Button class="p-d-block p-mx-auto p-button-lg" label="NOWY GRA" />
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { AvatarGenerator } from "random-avatar-generator";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    Button,
    InputText,
  },
  setup() {
    const avatar = new ref("");
    const generator = new AvatarGenerator();
    avatar.value = generator.generateRandomAvatar();

    const randAvatar = () => {
      avatar.value = generator.generateRandomAvatar();
    }

    return { avatar, randAvatar };
  },
};
</script>

<style scoped>
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
  right: 40%;
}
</style>
