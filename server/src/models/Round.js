import latinize from 'latinize';

class Round {
  constructor(letter, categories, players) {
    this.letter = letter;
    this.players = players;
    this.words = {};
    this.status = {};
    this.readyCount = 0;
    this.points = {};

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
    if (value) {
      this.words[player][category].rating.good++;
      this.words[player][category].rating.bad--;
    } else {
      this.words[player][category].rating.good--;
      this.words[player][category].rating.bad++;
    }
  }

  calcPoints() {
    this.players.forEach((player) => {
      this.points[player.id] = 0;
    });

    Object.keys(this.words).forEach(playerId => {
      const playerWords = this.words[playerId];
      for (let i = 0; i < playerWords.length; i++) {
        const word = playerWords[i];
        if(word.empty || word.rating.bad > word.rating.good) continue;

        const points = this.compareWord(word.word, i, playerId);
        this.points[playerId] += points;
        word.points = points;
      }
    })
  }

  compareWord(word, i, playerId){
    let points = 15;
    let wordA = latinize(word.toLowerCase());
    
    Object.keys(this.words).every(playerB => {
      if(playerId == playerB) return true;
      let wordB = latinize(this.words[playerB][i].word.toLowerCase());
      if (wordA === wordB) {
        points = 5;
        return false;
      }
      if (!this.words[playerB][i].empty) {
        points = 10;
        return true;
      }
    })

    return points;
  }

  getPoints(){
    return this.points;
  }

  voteReady() {
    this.readyCount++;
  }

  voteReadyCount() {
    return this.readyCount;
  }

  playersWordsCount() {
    return Object.keys(this.words).length;
  }

  getWords() {
    return this.words;
  }
}

export default Round;
