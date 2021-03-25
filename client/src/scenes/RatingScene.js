import Phaser from "phaser";
import { getUsers } from "../api/getUsers";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

const GetValue = Phaser.Utils.Objects.GetValue;

class RatingScene extends Phaser.Scene {
  constructor() {
    super("ratingScene");
    this.rating = [];
  }

  preload() {
    this.load.scenePlugin({
      key: "rexuiplugin",
      url:
        "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  init() {
    this.cameras.main.setBackgroundColor("#bfcc00");
  }

  create() {
    getUsers()
      .then((result) => {
        result.map((data, index) =>
          this.rating.push({
            id: index + 1,
            name: data.name,
            score: data.score,
          })
        );
      })
      .then(() => this.renderTable());
  }

  renderTable() {
    this.input.keyboard.once("keydown-ENTER", () =>
      this.scene.start("gameScene")
    );
    var gridTable = this.rexUI.add
      .gridTable({
        x: this.cameras.main.centerX,
        y: this.cameras.main.centerY,
        width: 500,
        height: 420,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x4e342e),

        table: {
          cellWidth: undefined,
          cellHeight: 30,

          columns: 1,

          mask: {
            padding: 2,
          },

          reuseCellContainer: true,
        },

        header: createRowItem(this, {
          background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, 0x260e04),
          text: this.add
            .text(320, 15, "TOP 10 PLAYERS", {
              fontFamily: "bebas",
              fontSize: 30,
              color: "#ffffff",
            })
            .setShadow(2, 2, "#333333", 2, false, true)
            .setOrigin(0.5),
          id: this.add.text(0, 0, "Id"),
          score: this.add.text(0, 0, "Score"),
          name: this.add.text(0, 0, "Name"),
          height: 30,
        }),

        footer: this.rexUI.add.label({
          width: undefined,
          height: 30,

          background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, 0x260e04),
          text: this.add.text(0, 0, " Press enter to restart game"),
        }),

        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,

          table: 10,
          header: 10,
        },

        createCellContainerCallback: function (cell, cellContainer) {
          var scene = cell.scene,
            width = cell.width,
            height = cell.height,
            item = cell.item,
            index = cell.index;
          if (cellContainer === null) {
            cellContainer = createRowItem(scene);
          }

          cellContainer.setMinSize(width, height);
          cellContainer.getElement("id").setText(item.id);
          cellContainer.getElement("name").setText(item.name);
          cellContainer.getElement("score").setText(item.score);
          return cellContainer;
        },
        items: this.rating,
      })
      .layout();
  }
}

var createRowItem = function (scene, config, name) {
  var background = GetValue(config, "background", undefined);
  var back = GetValue(config, "back", undefined);
  var ground = GetValue(config, "ground", undefined);
  background = scene.rexUI.add
    .roundRectangle(0, 0, 20, 20, 0)
    .setStrokeStyle(2, 0x260e04);

  var id = GetValue(config, "id", undefined);
  if (id === undefined) {
    id = scene.add.text(0, 0, id);
  }

  var name = GetValue(config, "name", undefined);
  if (name === undefined) {
    name = scene.add.text(0, 0, name);
  }

  var score = GetValue(config, "score", undefined);
  if (score === undefined) {
    score = scene.add.text(0, 0, score);
  }

  return scene.rexUI.add
    .sizer({
      width: GetValue(config, "width", undefined),
      height: GetValue(config, "height", undefined),
      orientation: "x",
    })
    .addBackground(background)
    .add(
      id, // child
      0, // proportion, fixed width
      "center", // align vertically
      { left: 10 }, // padding
      false, // expand vertically
      "id" // map-key
    )
    .addSpace()
    .add(
      name, // child
      0, // proportion, fixed width
      "center", // align vertically
      { right: 10 }, // padding
      false, // expand vertically
      "name" // map-key
    )
    .addSpace()
    .add(
      score, // child
      0, // proportion, fixed width
      "center", // align vertically
      { right: 20 }, // padding
      false, // expand vertically
      "score" // map-key
    );
};

export default RatingScene;
