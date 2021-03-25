import Phaser from "phaser";

class AuthScene extends Phaser.Scene {

    constructor () {
        super('authScene');
    }
    init(){
        this.cameras.main.setBackgroundColor("#bfcc00");
    }

    create (data){
        this.add.rectangle(640, 480, 0x000000);

        this.add.text(300, 130,`Hello ${data.name}.` , { fontFamily: 'bebas', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5);
        this.add.text(300, 200, `Let's see you have total score: ${data.score}.`, { fontFamily: 'bebas', fontSize: 26, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5);
        this.add.text(300, 240, `Now you play in level: ${data.lvl}.`, { fontFamily: 'bebas', fontSize: 26, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5);
        this.add.text(300, 280, `To continue press enter or click.`, { fontFamily: 'bebas', fontSize: 40, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true).setOrigin(0.5);
        this.input.on('pointerdown',()=> this.scene.start("gameScene",data));
        this.input.keyboard.once('keydown-ENTER',()=>this.scene.start("gameScene",data));
    }



}

export default AuthScene
