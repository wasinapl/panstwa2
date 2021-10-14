<template>
  <div id="container">
    <div id="letters-container">
      <div id="letters" :style="{left: `${left}px`}">
        <div class="letter p-text-center" v-for="(letter, i) in letters" :key="i">
          <h1>{{ letter }}</h1>
        </div>
      </div>
    </div>
    <div id="lines"></div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "RandomLetter",
  props: ["letter"],
  emits: ["done"],
  setup(props, { emit }) {
    const letters = ref([]);
    const alphabet = "abcdefghijklmnoprstuwz".split("");
    const left = ref(-2500);

    for (let i = 0; i < 30; i++) {
      letters.value.push(
        alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase()
      );
    }
    letters.value[4] = props.letter;

    setTimeout(() => {
      left.value = 0;
    }, 200)
    setTimeout(() => {
      emit('done');
    }, 5200)

    return { letters, left };
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

#lines {
  height: 100%;
  width: 11%;
  border-right: 5px solid #1c6ea4;
  border-left: 5px solid #1c6ea4;
  position: absolute;
  left: 50% - 85px;
}

#letters-container {
  height: 100px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

#letters {
  height: 100px;
  width: 100%;
  position: absolute;
  transition: left 5s cubic-bezier(0.215, 0.61, 0.355, 1);
  white-space: nowrap;
}

.letter {
  display: inline-block;
  width: 11%;
  height: 100%;
  border-right: 5px transparent;
  border-left: 5px transparent;
}
</style>
