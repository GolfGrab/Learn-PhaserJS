import Phaser from "phaser"

export default class Game extends Phaser.Scene {

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  
  private penguin!: Phaser.Physics.Matter.Sprite
  
  constructor() {
    super("GameScene")
  }

  init()
  {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.atlas("penguin", "assets/penguin.png", "assets/penguin.json")
    this.load.image("tiles", "assets/sheet.png")
    this.load.tilemapTiledJSON("tilemap", "assets/game.json")
  }

  create() {
    this.createPlayerAnimation()

    const { width, height } = this.scale

    const map = this.make.tilemap({ key: "tilemap" })
    const tileset = map.addTilesetImage("iceworld", "tiles")

    const ground = map.createLayer("ground", tileset)
    ground.setCollisionByProperty({ collides: true })

    this.matter.world.convertTilemapLayer(ground)


    this.penguin = this.matter.add.sprite(width / 2, height / 2, "penguin")
      .play("player-idle")
  }

  update() {
    if(this.cursors.left.isDown) {
    }
  }

  private createPlayerAnimation() {

    this.anims.create({
      key: "player-idle",
      frames: [{
        key: "penguin",
        frame: "penguin_walk01.png"
      }],
    })


    this.anims.create({
      key: "player-walk",
      frameRate: 10,
      frames: this.anims.generateFrameNames("penguin", {
        start: 1,
        end: 4,
        zeroPad: 2,
        prefix: "penguin_walk",
        suffix: ".png"
      }),
      repeat: -1
    })


  }
}
