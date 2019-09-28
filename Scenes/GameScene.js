class GameScene extends Phaser.Scene {
  cardsUnshuffled = [];
  faces = [
    "RedGem",
    "BlueGem",
    "GreenGem",
    "LavenderGem",
    "LightBlueGem",
    "OrangeGem",
    "PinkGem",
    "PurpleGem",
    "TealGem",
    "YellowGem"
  ];
  card1 = null;
  matches = 0;

  constructor() {
    super();
  }
  create() {
    this.matches = 0;
    this.card1 = null;
    this.card2 = null;

    for (let index = 0; index < this.faces.length; index++) {
      this.cardsUnshuffled.push({ face: this.faces[index], back: "Back" });
      this.cardsUnshuffled.push({ face: this.faces[index], back: "Back" });
    }
    this.cardsUnshuffled = this.shuffle(this.cardsUnshuffled);

    let counter = 0;
    for (let width = 0; width < 5; width++) {
      for (let height = 0; height < 4; height++) {
        let card = this.add.sprite(
          700 - (800 / 5) * width,
          525 - (600 / 4) * height,
          this.cardsUnshuffled[counter].back
        );
        card.front = this.cardsUnshuffled[counter].face;
        card.faceUp = false;
        card.setScale(0.6);
        card.setInteractive().on("clicked", this.clickHandler, this);
        counter++;
      }
    }
    this.input.on(
      "gameobjectup",
      function(pointer, gameObject) {
        gameObject.emit("clicked", gameObject);
      },
      this
    );
  }
  preload() {
    this.load.image("RedGem", "Cards/RedGemCard.png");
    this.load.image("BlueGem", "Cards/BlueGemCard.png");
    this.load.image("GreenGem", "Cards/GreenGemCard.png");
    this.load.image("LavenderGem", "Cards/LavenderGemCard.png");
    this.load.image("LightBlueGem", "Cards/LightBlueGemCard.png");
    this.load.image("OrangeGem", "Cards/OrangeGemCard.png");
    this.load.image("PinkGem", "Cards/PinkGemCard.png");
    this.load.image("PurpleGem", "Cards/PurpleGemCard.png");
    this.load.image("TealGem", "Cards/TealGemCard.png");
    this.load.image("YellowGem", "Cards/YellowGemCard.png");

    this.load.image("Back", "Cards/CardBack.png");
  }

  shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  clickHandler = function(card) {
    if (!card.matched) {
      if (!card.faceUp) {
        this.flipToFront(card);
        card.faceUp = true;
      }
      if (!this.card1) {
        this.card1 = card;
      } else if (card === this.card1) {
        //Do nothing
      } else {
        if (this.card1.front === card.front) {
          this.card1.matched = true;
          card.matched = true;
          this.matches++;
          this.card1 = null;
          if (this.matches >= 10) {
            setTimeout(() => {
              this.scene.start(game_over_scene);
              this.scene.stop(game_scene);
            }, 5000);
          }
        } else {
          this.flipToBack(this.card1);
          this.card1.faceUp = false;
          this.flipToBack(card);
          card.faceUp = false;
          this.card1 = null;
        }
      }
    }
  };

  flipToBack = function(card) {
    this.tweens.add({
      targets: card,
      scaleX: 0,
      scaleY: 0.8,
      ease: "Sine.easeInOut",
      delay: 1000,
      duration: 150,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        card.setTexture("Back");
        this.tweens.add({
          targets: card,
          scaleX: 0.6,
          scaleY: 0.6,
          ease: "Sine.easeInOut",
          duration: 150,
          yoyo: false,
          repeat: 0
        });
      }
    });
  };

  flipToFront = function(card) {
    this.tweens.add({
      targets: card,
      scaleX: 0,
      scaleY: 0.8,
      ease: "Sine.easeInOut",
      duration: 150,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        card.setTexture(card.front);
        this.tweens.add({
          targets: card,
          scaleX: 0.6,
          scaleY: 0.6,
          ease: "Sine.easeInOut",
          duration: 150,
          yoyo: false,
          repeat: 0
        });
      }
    });
  };
}
module.exports = GameScene;
