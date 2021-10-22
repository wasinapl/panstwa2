<template>
  <div id="chat-container">
    <transition name="slide-chat" mode="out-in">
      <div id="chat" class="p-p-3" v-if="active">
        <div id="messages" class="p-d-flex p-pb-3 p-flex-column-reverse">
          <div
            class="message p-d-flex p-mt-2 p-ai-center"
            v-for="(message, i) in messages"
            :key="i"
            :class="{ 'p-flex-row-reverse': message.me }"
          >
            <div class="user p-d-flex p-flex-column">
              <img class="avatar" :src="message.avatar" alt="avatar" />
              <div class="nick p-text-center">{{ message.nick }}</div>
            </div>
            <div class="text p-shadow-1" :class="{ me: message.me }">
              {{ message.text }}
            </div>
          </div>
        </div>
        <div id="form" class="p-d-flex p-ai-start p-jc-center">
          <InputText type="text" v-model="message" v-on:keyup.enter="send"/>
          <Button
            id="button"
            icon="pi pi-send"
            class="p-button-primary"
            @click="send"
          />
        </div>
        <i
          class="pi pi-times p-button-primary"
          id="exit"
          @click="active = !active"
        ></i>
      </div>
      <Button
        v-else
        id="button"
        icon="pi pi-comment"
        class="p-button-rounded p-button-primary"
        @click="active = !active"
      />
    </transition>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import { ref, inject } from "vue";

export default {
  name: "Chat",
  components: { Button, InputText, Avatar },
  setup() {
    const active = ref(false);
    const message = ref("");
    const messages = ref([]);
    const store = inject("store");
    const socket = inject("socket");

    socket.on('message', msg => {
        msg.me = false;
        messages.value.unshift(msg);
    })

    const send = () => {
      const msg = {
        avatar: store.state.player.avatar,
        nick: store.state.player.name,
        text: message.value,
        me: true,
      };
      messages.value.unshift(msg);
      message.value = "";
      socket.emit("message", msg);
    };

    return { active, message, messages, send };
  },
};
</script>

<style scoped>
#chat-container {
  position: absolute;
  bottom: 5%;
  right: 5%;
}
#chat {
  height: 350px;
  width: 300px;
  background: #121212;
  border-radius: 25px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#messages {
  width: 100%;
  height: 85%;
  margin-top: 15px;
  margin-bottom: 5px;
  overflow-y: scroll;
}
#form {
  width: 100%;
  height: 15%;
}

#exit {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: var(--primary-color);
}

.user {
  margin-right: 5px;
  margin-left: 5px;
}

.nick {
  font-size: 12px;
}

.avatar {
  height: 35px;
}

.text {
  background: #292929;
  padding: 8px;
  border-radius: 0px 5px 5px 5px;
  word-wrap: break-word;
}

.text.me {
  background: var(--primary-color);
  border-radius: 5px 0px 5px 5px;
}

.slide-chat-enter,
.slide-chat-leave-to {
  transform: scale(1, 0) translateY(200%);
  opacity: 0;
}

.slide-chat-enter-active,
.slide-chat-leave-active {
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background: #b3afb3;
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b3afb3;
}
::-webkit-scrollbar-track {
  background: #121212;
  border-radius: 0px;
  box-shadow: inset 0px 0px 0px 0px #f0f0f0;
}
</style>
