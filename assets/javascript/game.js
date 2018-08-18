var game = {
  wordsToPick: {
    akuma: {
      picture: "akuma.png"
     },
    cable: {
      picture: "cable.png"
    },
    cammy: {
      picture: "cammy.png"
    },
    cylops: {
      picture: "cyclops.png"
    },
    dhalsim: {
      picture: "dhalsim.png"
    },
    gambit: {
      picture: "gambit.png"
    },
    guile: {
      picture: "guile.png"
    },
    hulk: {
      picture: "hulk.png"
    },
    iceman: {
      picture: "iceman.png"
    },
    ironman: {
      picture: "ironman.png"
    },
    juggernaut: {
      picture: "juggernaut.png"
    },
    ken: {
      picture: "ken.png"
    },
    magneto: {
      picture: "magneto.png"
    },
    megaman: {
      picture: "megaman.png"
    },
    psylocke: {
      picture: "psylocke.png"
    },
    rogue: {
      picture: "rogue.png"
    },
    ryu: {
      picture: "ryu.png"
    },
    sakura: {
      picture: "sakura.png"
    },
    spiderman: {
      picture: "spiderman.png"
    },
    storm: {
      picture: "storm.png"
    },
    thanos: {
      picture: "thanos.png"
    },
    venom: {
      picture: "venom.png"
    },
    wolverine: {
      picture: "wolverine.png"
    },
    zangief: {
      picture: "zangief.png"
    }
  },

  // Variables that set the initial state of our hangman game.
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  setupGame: function() {
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    this.lettersOfTheWord = this.wordInPlay.split("");
    this.rebuildWordView();
    this.processUpdateTotalGuesses();
  },
  updatePage: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    else {
      this.updateGuesses(letter);
      this.updateMatchedLetters(letter);
      this.rebuildWordView();
    if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },
  updateGuesses: function(letter) {
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
      this.guessedLetters.push(letter);
      this.guessesLeft--;
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },
  processUpdateTotalGuesses: function() {
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },
  updateMatchedLetters: function(letter) {
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        this.matchedLetters.push(letter);
      }
    }
  },
  rebuildWordView: function() {
    var wordView = "";
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      else {
        wordView += "&nbsp;_&nbsp;";
      }
    }
    document.querySelector("#current-word").innerHTML = wordView;
  },
  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  updateWins: function() {
    var win;
    if (this.matchedLetters.length === 0) {
      win = false;
    }

    else {
      win = true;
    }

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    if (win === true) {
      this.wins = this.wins + 1;
      document.querySelector("#wins").innerHTML = this.wins;
      document.querySelector("#music").innerHTML = this.wordsToPick[this.wordInPlay].song +
      " By " + this.wordInPlay;

      document.querySelector("#band-div").innerHTML =
       "<img class='band-image' src='assets/images/" +
       this.wordsToPick[this.wordInPlay].picture + "' alt='" +
       this.wordsToPick[this.wordInPlay].song + "'>";

      
      var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
      audio.play();

      return true;
    }

    else {
      return false;
    }
  }
};

game.setupGame();
document.onkeyup = function(event) {
  game.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  game.updatePage(game.letterGuessed);
};