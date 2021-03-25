import Phaser from "phaser";

class WonLevelScene extends Phaser.Scene {
  constructor() {
    super("wonLevelScene");
  }

  init() {
    this.cameras.main.setBackgroundColor("#bfcc00");
  }

  create(data) {
    this.add.rectangle(640, 480, 0x000000, 0.7);
    let title = "YOU WIN!";
    let textLevel = `Press enter or click for ${data.user.lvl} level.`
    let rating = `Press tab to see the rating.`;
    this.add
      .text(300, 130, title, {
        fontFamily: "bebas",
        fontSize: 80,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.add
      .text(300, 200, textLevel, {
        fontFamily: "bebas",
        fontSize: 30,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.add
      .text(300, 240, rating, {
        fontFamily: "bebas",
        fontSize: 30,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.input.on("pointerdown", () => this.scene.start("gameScene"));
    this.input.keyboard.once("keydown-ENTER", () =>
      this.scene.start("gameScene")
    );
    this.input.keyboard.once("keydown-TAB", () =>
      this.scene.start("ratingScene")
    );
  }
}

export default WonLevelScene;
