import Phaser from "phaser";
import { editUser } from "../api/editUser";
import { getUser } from "../api/getUser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("gameScene");
    this.snake = undefined;
    this.food = undefined;
    this.cursors = undefined;
    this.user = { name: "", token: "", score: 0, lvl: 0 };
    this.gameOver = false;
    this.score = 0;
    this.speedUser = 100;
    this.limitTime = 60;
    this.gameStart = undefined;

    this.timeText = "";
    this.scoreText = "";
    this.levelText = "";

    this.UP = 0;
    this.DOWN = 1;
    this.LEFT = 2;
    this.RIGHT = 3;

    this.styleGame = {
      fontSize: "16px",
      fill: "#7367c5",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#bfcc00");

    getUser(data._id)
      .then((result) => (this.user = result))
      .then(() => {
        if (this.user.lvl <= 16) {
          this.speedUser = this.speedUser - this.user.lvl * 5;
          }
        this.levelText.setText(`Level: ${this.user.lvl}`);
      });

    this.levelText = this.add.text(
      16,
      16,
      `level: ${this.user.lvl}`,
      this.styleGame
    );

    this.timeText = this.add.text(
      110,
      16,
      `Time: ${this.limitTime}`,
      this.styleGame
    );

    this.scoreText = this.add.text(
      210,
      16,
      `Score: ${this.score}`,
      this.styleGame
    );
  }

  preload() {
    this.load.image("food", "/snake/food.png");
    this.load.image("body", "/snake/body.png");
  }

  create() {
    let tmp = this;

    this.gameStart = setInterval(() => {
      this.limitTime -= 1;
      this.timeText.setText("Time: " + this.limitTime);
      gameСonditions();
    }, 1000);

    let gameСonditions = () => {
      if (this.snake.alive === false) {
        tmp.scene.start("overTimeScene", { user: tmp.user, data: tmp.score });
        endGame();
      } else if (this.limitTime === 0) {
        tmp.scene.start("overTimeScene", { user: tmp.user, data: tmp.score });
        endGame();
      } else if (this.score >= 50) {
        if (this.user.lvl < 16) {
          tmp.scene.start("wonLevelScene", { user: tmp.user });
          endGame();
        }
      }
    };

    let endGame = () => {
      tmp.user.score += tmp.score;
      this.limitTime = 60;
      this.speedUser = 100;
      tmp.score = 0;
      editUser(tmp.user);
      clearInterval(tmp.gameStart);
    };

    let Food = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,

      initialize: function Food(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);

        this.setTexture("food");
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);
        this.total = 0;
        scene.children.add(this);
      },

      eat: function () {
        this.total++;
      },
    });

    let Snake = new Phaser.Class({
      initialize: function Snake(scene, x, y) {
        this.headPosition = new Phaser.Geom.Point(x, y);

        this.body = scene.add.group();

        this.head = this.body.create(x * 16, y * 16, "body");
        this.head.setOrigin(0);

        this.alive = true;

        this.moveTime = 0;

        this.tail = new Phaser.Geom.Point(x, y);

        this.heading = tmp.RIGHT;
        this.direction = tmp.RIGHT;
      },

      update: function (time) {
        if (time >= this.moveTime) {
          return this.move(time);
        }
      },

      faceLeft: function () {
        if (this.direction === tmp.UP || this.direction === tmp.DOWN) {
          this.heading = tmp.LEFT;
        }
      },

      faceRight: function () {
        if (this.direction === tmp.UP || this.direction === tmp.DOWN) {
          this.heading = tmp.RIGHT;
        }
      },

      faceUp: function () {
        if (this.direction === tmp.LEFT || this.direction === tmp.RIGHT) {
          this.heading = tmp.UP;
        }
      },

      faceDown: function () {
        if (this.direction === tmp.LEFT || this.direction === tmp.RIGHT) {
          this.heading = tmp.DOWN;
        }
      },

      move: function (time) {
        switch (this.heading) {
          case tmp.LEFT:
            this.headPosition.x = Phaser.Math.Wrap(
              this.headPosition.x - 1,
              0,
              40
            );
            break;

          case tmp.RIGHT:
            this.headPosition.x = Phaser.Math.Wrap(
              this.headPosition.x + 1,
              0,
              40
            );
            break;

          case tmp.UP:
            this.headPosition.y = Phaser.Math.Wrap(
              this.headPosition.y - 1,
              0,
              30
            );
            break;

          case tmp.DOWN:
            this.headPosition.y = Phaser.Math.Wrap(
              this.headPosition.y + 1,
              0,
              30
            );
            break;
        }

        this.direction = this.heading;

        Phaser.Actions.ShiftPosition(
          this.body.getChildren(),
          this.headPosition.x * 16,
          this.headPosition.y * 16,
          1,
          this.tail
        );

        let hitBody = Phaser.Actions.GetFirst(
          this.body.getChildren(),
          { x: this.head.x, y: this.head.y },
          1
        );

        if (hitBody) {
          this.alive = false;
          this.endGame();
          return false;
        } else {
          this.moveTime = time + tmp.speedUser;

          return true;
        }
      },

      grow: function () {
        let newPart = this.body.create(this.tail.x, this.tail.y, "body");

        newPart.setOrigin(0);
      },

      collideWithFood: function (food) {
        if (this.head.x === food.x && this.head.y === food.y) {
          this.grow();
          food.eat();

          tmp.score += 10;
          tmp.scoreText.setText("Score: " + tmp.score);

          if (tmp.speedUser > 20 && food.total % 5 === 0) {
            tmp.user.lvl += 1;
            tmp.levelText.setText(`Level: ${tmp.user.lvl}`);
            tmp.speedUser -= 5;
          }

          return true;
        } else {
          return false;
        }
      },

      updateGrid: function (grid) {
        this.body.children.each(function (segment) {
          let bx = segment.x / 16;
          let by = segment.y / 16;

          grid[by][bx] = false;
        });

        return grid;
      },
    });

    tmp.food = new Food(this, 3, 4);

    tmp.snake = new Snake(this, 8, 8);

    tmp.cursors = tmp.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (!this.snake.alive) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.snake.faceLeft();
    } else if (this.cursors.right.isDown) {
      this.snake.faceRight();
    } else if (this.cursors.up.isDown) {
      this.snake.faceUp();
    } else if (this.cursors.down.isDown) {
      this.snake.faceDown();
    }

    if (this.snake.update(time)) {
      if (this.snake.collideWithFood(this.food)) {
        this.repositionFood();
      }
    }
  }

  repositionFood() {
    let testGrid = [];

    for (let y = 0; y < 30; y++) {
      testGrid[y] = [];

      for (let x = 0; x < 40; x++) {
        testGrid[y][x] = true;
      }
    }

    this.snake.updateGrid(testGrid);

    let validLocations = [];

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      let pos = Phaser.Math.RND.pick(validLocations);

      this.food.setPosition(pos.x * 16, pos.y * 16);

      return true;
    } else {
      return false;
    }
  }
}

export default GameScene;
