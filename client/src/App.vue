<template>
  <div
    class="p-grid p-jc-center p-ai-center vertical-container"
    style="height: 100vh"
  >
    <div class="p-col-8" id="main" style="position: relative;">
      <router-view />
    </div>
  </div>
</template>

<script>
import { provide, inject } from "vue";
import store from "@/store";

export default {
  name: "App",
  setup() {
    provide("store", store);
    const socket = inject("socket");

    socket.on("connect", () => {
      store.methods.setPlayerId(socket.id);
    });

    return {};
  },
};
</script>

<style>
body {
  background: #0f1113;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

#main {
  color: white;
  height: 80vh;
  background-color: #1e1e1e;
  border: 5px solid rgb(255 255 255 / 19%);
  border-radius: 10px;
}
</style>
