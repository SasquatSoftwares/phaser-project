import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    console.log('preload(BootScene);');
    this.load.image('tiles', 'assets/map/spritesheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    // our two characters
    this.load.spritesheet('player', 'assets/img/RPG_assets.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    console.log('create(BootScene);');
    this.scene.start('MainScene');
  }

  update() {
    console.log('update(BootScene);');
  }
}
