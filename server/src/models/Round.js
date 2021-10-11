class Round {
  constructor(letter, categories, players) {
    this.letter = letter;
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
}

export default Round;
