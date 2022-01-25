import 'phaser';

export default class MainScene extends Phaser.Scene {
  player;
  cursors;
  spawns;

  constructor() {
    super('MainScene');
  }

  preload() {
    console.log('preload(MainScene);');

    // user input
    //this.cursors = this.input.keyboard.createCursorKeys();

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  create() {
    console.log('create(MainScene);');
    // create the map
    var map = this.make.tilemap({ key: 'yssy_sede' });

    // first parameter is the name of the tilemap in tiled
    var piso = map.addTilesetImage('piso', 'piso');
    var vidro_externo = map.addTilesetImage('vidro_externo', 'vidro_externo');
    var paredes = map.addTilesetImage('paredes', 'paredes');
    var moveis_decoracao = map.addTilesetImage('moveis_decoracao', 'moveis_decoracao');
    var mesa_menor = map.addTilesetImage('mesa_menor', 'mesa_menor');
    var paredes_internas = map.addTilesetImage('paredes_internas', 'paredes_internas');
    var rack = map.addTilesetImage('rack', 'rack');
    var laptop = map.addTilesetImage('laptop', 'laptop');
    var mesa = map.addTilesetImage('mesa', 'mesa');
    var mesa_redonda = map.addTilesetImage('mesa_redonda', 'mesa_redonda');

    // creating the layers
    var pisoLayer = map.createLayer('piso', piso, 0, 0);
    var vidro_externoLayer = map.createLayer('vidros_externo', vidro_externo, 0, 0);
    var janelas_superioresLayer = map.createLayer('janelas_superiores', paredes, 0, 0);
    var cadeiras_topoLayer = map.createLayer('cadeiras_topo', moveis_decoracao, 0, 0);
    var mesas_topoLayer = map.createLayer('mesas_topo', mesa_menor, 0, 0);
    var mesas_topo_uncollideLayer = map.createLayer('mesas_topo_uncollide', mesa_menor, 0, 0);
    var paredes_internasLayer = map.createLayer('paredes_internas', [paredes_internas, paredes], 0, 0);
    var paredes_internas_caminhoLayer = map.createLayer('paredes_internas_caminho', paredes_internas, 0, 0);
    var cadeiras_atras_mesas_dir_topoLayer = map.createLayer('direita/topo/cadeiras_atras_mesas_dir_topo', moveis_decoracao, 0, 0);
    var mesas_frente_paredes_dir_topoLayer = map.createLayer('direita/topo/mesas_frente_paredes_dir_topo', mesa, 0, 0);
    var cadeiras_frente_mesas_dir_topoLayer = map.createLayer('direita/topo/cadeiras_frente_mesas_dir_topo', moveis_decoracao, 0, 0);
    var laptops_dir_topoLayer = map.createLayer('direita/topo/laptops_dir_topo', laptop, 0, 0);
    var cadeiras_atras_mesas_dirLayer = map.createLayer('direita/cadeiras_atras_mesas_dir', moveis_decoracao, 0, 0);
    var mesas_frente_paredes_dirLayer = map.createLayer('direita/mesas_frente_paredes_dir', mesa, 0, 0);
    var cadeiras_frente_mesas_dirLayer = map.createLayer('direita/cadeiras_frente_mesas_dir', moveis_decoracao, 0, 0);
    var laptops_dirLayer = map.createLayer('direita/laptops_dir', laptop, 0, 0);
    var cadeiras_atras_mesas_esqLayer = map.createLayer('esquerda/cadeiras_atras_mesas_esq', moveis_decoracao, 0, 0);
    var mesas_frente_paredes_esqLayer = map.createLayer('esquerda/mesas_frente_paredes_esq', mesa, 0, 0);
    var cadeiras_frente_mesas_esqLayer = map.createLayer('esquerda/cadeiras_frente_mesas_esq', moveis_decoracao, 0, 0);
    var laptops_esqLayer = map.createLayer('esquerda/laptops_esq', laptop, 0, 0);
    var mesa_redondaLayer = map.createLayer('mesa_redonda', mesa_redonda, 0, 0);
    var paredesLayer = map.createLayer('paredes', paredes, 0, 0);
    var cadeirasLayer = map.createLayer('cadeiras', moveis_decoracao, 0, 0);
    var rack_frenteLayer = map.createLayer('rack/rack_frente', rack, 0, -11);

    const allObstacles = [
      vidro_externoLayer, janelas_superioresLayer, cadeiras_topoLayer, mesas_topoLayer,
      mesa_redondaLayer, paredes_internasLayer, cadeiras_atras_mesas_dir_topoLayer,
      mesas_frente_paredes_dir_topoLayer, cadeiras_frente_mesas_dir_topoLayer,
      laptops_dir_topoLayer, cadeiras_atras_mesas_dirLayer, mesas_frente_paredes_dirLayer,
      cadeiras_frente_mesas_dirLayer, laptops_dirLayer, cadeiras_atras_mesas_esqLayer,
      mesas_frente_paredes_esqLayer, cadeiras_frente_mesas_esqLayer, laptops_esqLayer,
      paredesLayer, cadeirasLayer, rack_frenteLayer
    ];

    // make all tiles in obstacles collidable
    allObstacles.forEach((o) => o.setCollisionByExclusion([-1]));

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [2, 8, 2, 14],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [0, 6, 0, 12],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(500, 350, 'player', 6);
    var rack_fundoLayer = map.createLayer('rack/rack_fundo', rack, 0, 0);

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on trees
    allObstacles.forEach((o) => this.physics.add.collider(this.player, o));

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // where the enemies will be
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    for (var i = 0; i < 30; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }

    // // add collider
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawns,
    //   this.onMeetEnemy,
    //   false,
    //   this
    // );
  }

  update() {
    console.log('update(MainScene);');
    //    this.controls.update(delta);

    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}
