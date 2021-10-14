class Round {
  constructor(letter, categories, players) {
    this.letter = letter;
    this.players = players;
    this.words = {};
    this.status = {};

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      for (let j = 0; j < players.length; j++) {
        const player = players[j];
        this.status[category.id] = {};
        this.status[category.id][player.id] = 0;
      }
    }
  }

  addWords(words, socket) {
    this.words[socket.id] = new Array();
    words.forEach((word) => {
      let wordObj = {
        word,
        rating: {},
      };
      if (word.length > 1) {
        wordObj.rating = {
          good: this.players.length,
          bad: 0,
        };
      } else {
        wordObj.rating = {
          good: 0,
          bad: this.players.length,
        };
        wordObj.empty = true;
      }
      this.words[socket.id].push(wordObj);
    });
  }

  vote({ player, category, value }) {
      if(value){
        this.words[player][category].rating.good++;
        this.words[player][category].rating.bad--;
      }
      else{
        this.words[player][category].rating.good--;
        this.words[player][category].rating.bad++;
      }
  }

  playersWordsCount() {
    return Object.keys(this.words).length;
  }

  getWords() {
    return this.words;
  }
}

export default Round;
