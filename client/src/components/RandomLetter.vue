<template>
  <div id="container">
    <h5>{{ letters[0] }}</h5>
    <h4>{{ letters[1] }}</h4>
    <h3>{{ letters[2] }}</h3>
    <h2>{{ letters[3] }}</h2>
    <h2>{{ letters[4] }}</h2>
    <h1>{{ letters[5] }}</h1>
    <h2>{{ letters[6] }}</h2>
    <h2>{{ letters[7] }}</h2>
    <h3>{{ letters[8] }}</h3>
    <h4>{{ letters[9] }}</h4>
    <h5>{{ letters[10] }}</h5>
    <div id="lines"></div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RandomLetter",
  props: ["letter"],
  emits: ['done'],
  setup(props, {emit}) {
    const letters = ref([]);
    const alphabet = "abcdefghijklmnoprstuwz".split("");
    let time = 50;
    let count = 0;

    for (let i = 0; i < 11; i++) {
      letters.value.push(
        alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase()
      );
    }

    const changeLetter = () => {
      if (time < 300) setTimeout(changeLetter, time);
      else setTimeout(() => { emit("done") }, 2000)
      time *= 1.1;
      letters.value.shift();
      if (++count == 15) letters.value.push(props.letter);
      else
        letters.value.push(
          alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase()
        );
    };

    changeLetter();

    return { letters };
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

h1,
h2,
h3,
h4,
h5 {
  width: 10%;
  text-align: center;
}

h1 {
  font-size: 8rem;
}
h2 {
  font-size: 6rem;
  opacity: 0.9;
}
h3 {
  font-size: 5rem;
  opacity: 0.7;
}
h4 {
  font-size: 4rem;
  opacity: 0.5;
}
h5 {
  font-size: 3rem;
  opacity: 0.3;
}
</style>
