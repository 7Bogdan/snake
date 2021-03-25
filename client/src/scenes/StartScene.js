import Phaser from "phaser";
import { createContact } from "../api/createUser";
import { getUser } from "../api/getUser";

class StartScene extends Phaser.Scene {
  constructor() {
    super("startScene");
    this.user = {
      name: "",
      token: undefined,
      score: 0,
      lvl: 0,
    };
  }

  init() {
    this.cameras.main.setBackgroundColor("#bfcc00");
    let prev = JSON.parse(localStorage.getItem("snake"));
    if (prev) {
      getUser(prev._id, prev.token).then((result) => {
        localStorage.setItem("snake", JSON.stringify(result));
        this.scene.start("authScene", result);
        this.scene.remove("startScene");
      });
    }
  }

  preload() {
    this.load.html("nameform", "snake/loginform.html");
  }

  create() {
    let tmp = this;
    this.add
      .text(300, 50, "Before starting the game, you", {
        fontFamily: "bebas",
        fontSize: 30,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    this.add
      .text(300, 90, "need to set a nickname of 3 or more letters", {
        fontFamily: "bebas",
        fontSize: 30,
        color: "#ffffff",
      })
      .setShadow(2, 2, "#333333", 2, false, true)
      .setOrigin(0.5);
    let element = this.add.dom(300, 240).createFromCache("nameform");

    element.setPerspective(800);
    element.addListener("click");

    element.on("click", function (event) {
      if (event.target.name === "loginButton") {
        let inputUsername = this.getChildByName("username");
        if (inputUsername.value !== "" && inputUsername.value.length > 2) {
          this.removeListener("click");
          createContact(inputUsername.value)
            .then((result) => {
              localStorage.setItem("snake", JSON.stringify(result));
              return result;
            })
            .then((result) => tmp.start(result));
        }
      }
    });
  }

  start(user) {
    this.scene.start("gameScene", user);
    this.scene.remove("startScene");
  }
}

export default StartScene;
