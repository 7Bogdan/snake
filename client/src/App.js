import "./App.css";
import React from "react";
import Phaser from "phaser";

import StartScene from "./scenes/StartScene.js";
import AuthScene from "./scenes/AuthScene.js";
import GameScene from "./scenes/GameScene.js";
import RatingScene from "./scenes/RatingScene.js";
import OverTimeScene from "./scenes/OverTimeScene.js";
import WonLevelScene from "./scenes/WonLevelScene.js";

class App extends React.Component {
  componentDidMount() {
    const game = {
      type: Phaser.AUTO,
      parent: "phaser-game",
      width: 640,
      height: 480,
      dom: {
        createContainer: true,
      },
      scene: [
        StartScene,
        AuthScene,
        GameScene,
        WonLevelScene,
        OverTimeScene,
        RatingScene,
      ],
    };

    new Phaser.Game(game);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}

export default App;
