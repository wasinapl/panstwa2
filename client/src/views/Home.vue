<template>
  <Nickname />
</template>

<script>
import Nickname from '../components/Nickname.vue'
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: {
    Nickname
  },
  setup() {
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
