import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    console.log('preload(BootScene);');
    this.load.image('tiles', 'assets/map/spritesheet.png');
    this.load.image('cores', 'assets/map/cores.png');
    this.load.image('laptop', 'assets/map/laptop.png');
    this.load.image('mesa_menor', 'assets/map/mesa_menor.png');
    this.load.image('mesa_redonda', 'assets/map/mesa_redonda.png');
    this.load.image('mesa', 'assets/map/mesa.png');
    this.load.image('moveis_decoracao', 'assets/map/moveis_decoracao.png');
    this.load.image('paredes_internas', 'assets/map/paredes_internas.png');
    this.load.image('paredes', 'assets/map/paredes.png');
    this.load.image('piso', 'assets/map/piso.png');
    this.load.image('rack', 'assets/map/rack.png');
    this.load.image('vidro_externo', 'assets/map/glass_city.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.tilemapTiledJSON('yssy_sede', 'assets/map/yssy_sede.json');

    // our two characters
    this.load.spritesheet('player', 'assets/img/RPG_assets.png', {
      frameWidth: 32,
      frameHeight: 32
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
