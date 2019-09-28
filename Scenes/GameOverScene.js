class GameOverScene extends Phaser.Scene {
  constructor() {
    super();
  }
  create() {
    this.add
      .text(200, 500, "Game Over Scene", { fill: "#fff" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start(menu_scene);
        this.scene.stop(game_over_scene);
      });
  }
}
module.exports = GameOverScene;
