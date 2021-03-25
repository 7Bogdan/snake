import Phaser from "phaser";

class OverTimeScene extends Phaser.Scene {
  constructor() {
    super("overTimeScene");
  }

  init() {
    this.cameras.main.setBackgroundColor("#bfcc00");
  }

  create(data) {
    this.add.rectangle(640, 480);

    let title;
    let score;
    let needScore;
    if (data.user.lvl >= 16) {
      title = data.user.name;
      score = `Your score this time ${data.data},`;
      needScore = `total points ${data.user.score}`;
    } else {
      title = `GAME OVER!`;
      score = `You have score ${data.data},`;
      needScore = `but need 50 score for the next level.`;
    }
    let restar = `To restar press enter or click.`;
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
      .text(300, 200, score, {
        fontFamily: "bebas",
        fontSize: 30,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.add
      .text(300, 240, needScore, {
        fontFamily: "bebas",
        fontSize: 30,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.add
      .text(300, 280, restar, {
        fontFamily: "bebas",
        fontSize: 40,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.add
      .text(300, 320, rating, {
        fontFamily: "bebas",
        fontSize: 40,
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

export default OverTimeScene;
