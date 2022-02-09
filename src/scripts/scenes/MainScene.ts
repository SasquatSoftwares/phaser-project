import "phaser";
import YssyElement from "./YssyElement";
import dialogs from "./dialogs.js";
var _self: MainScene;
export default class MainScene extends Phaser.Scene {
  player;
  cursors;
  spawns;
  attendant;
  allObstacles;
  convBaloon;
  dialog_currentSprite;
  phaser_game;
  welcome_done: boolean = false;
  dialogStatus: {
    player: null;
    spriteBot: null;
    playerDialog: YssyElement | null;
    definition: null;
  };
  waitToHideConversation: number;

  constructor() {
    super("MainScene");
    this.convBaloon = document.getElementById("convBaloon");
    this.convBaloon.hidden = true;
    this.phaser_game = document.getElementById("phaser-game");
    this.phaser_game.onclick = this.hideConversation;
    _self = this;
  }

  preload() {
    console.log("preload(MainScene);");

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
    console.log("create(MainScene);");
    // create the map
    var map = this.make.tilemap({ key: "yssy_sede" });

    // first parameter is the name of the tilemap in tiled
    var piso = map.addTilesetImage("piso", "piso");
    var vidro_externo = map.addTilesetImage("vidro_externo", "vidro_externo");
    var paredes = map.addTilesetImage("paredes", "paredes");
    var moveis_decoracao = map.addTilesetImage(
      "moveis_decoracao",
      "moveis_decoracao"
    );
    var mesa_menor = map.addTilesetImage("mesa_menor", "mesa_menor");
    var paredes_internas = map.addTilesetImage(
      "paredes_internas",
      "paredes_internas"
    );
    var rack = map.addTilesetImage("rack", "rack");
    var laptop = map.addTilesetImage("laptop", "laptop");
    var mesa = map.addTilesetImage("mesa", "mesa");
    var mesa_redonda = map.addTilesetImage("mesa_redonda", "mesa_redonda");

    // creating the layers
    var pisoLayer = map.createLayer("piso", piso, 0, 0);
    var vidro_externoLayer = map.createLayer(
      "vidros_externo",
      vidro_externo,
      0,
      0
    );
    var janelas_superioresLayer = map.createLayer(
      "janelas_superiores",
      paredes,
      0,
      0
    );
    var cadeiras_topoLayer = map.createLayer(
      "cadeiras_topo",
      moveis_decoracao,
      0,
      0
    );
    var mesas_topoLayer = map.createLayer("mesas_topo", mesa_menor, 0, 0);
    var mesas_topo_uncollideLayer = map.createLayer(
      "mesas_topo_uncollide",
      mesa_menor,
      0,
      0
    );
    var paredes_internasLayer = map.createLayer(
      "paredes_internas",
      [paredes_internas, paredes],
      0,
      0
    );
    var paredes_internas_caminhoLayer = map.createLayer(
      "paredes_internas_caminho",
      paredes_internas,
      0,
      0
    );
    var cadeiras_atras_mesas_dir_topoLayer = map.createLayer(
      "direita/topo/cadeiras_atras_mesas_dir_topo",
      moveis_decoracao,
      0,
      0
    );
    var mesas_frente_paredes_dir_topoLayer = map.createLayer(
      "direita/topo/mesas_frente_paredes_dir_topo",
      mesa,
      0,
      0
    );
    var cadeiras_frente_mesas_dir_topoLayer = map.createLayer(
      "direita/topo/cadeiras_frente_mesas_dir_topo",
      moveis_decoracao,
      0,
      0
    );
    var laptops_dir_topoLayer = map.createLayer(
      "direita/topo/laptops_dir_topo",
      laptop,
      0,
      0
    );
    var cadeiras_atras_mesas_dirLayer = map.createLayer(
      "direita/cadeiras_atras_mesas_dir",
      moveis_decoracao,
      0,
      0
    );
    var mesas_frente_paredes_dirLayer = map.createLayer(
      "direita/mesas_frente_paredes_dir",
      mesa,
      0,
      0
    );
    var cadeiras_frente_mesas_dirLayer = map.createLayer(
      "direita/cadeiras_frente_mesas_dir",
      moveis_decoracao,
      0,
      0
    );
    var laptops_dirLayer = map.createLayer("direita/laptops_dir", laptop, 0, 0);
    var cadeiras_atras_mesas_esqLayer = map.createLayer(
      "esquerda/cadeiras_atras_mesas_esq",
      moveis_decoracao,
      0,
      0
    );
    var mesas_frente_paredes_esqLayer = map.createLayer(
      "esquerda/mesas_frente_paredes_esq",
      mesa,
      0,
      0
    );
    var cadeiras_frente_mesas_esqLayer = map.createLayer(
      "esquerda/cadeiras_frente_mesas_esq",
      moveis_decoracao,
      0,
      0
    );
    var laptops_esqLayer = map.createLayer(
      "esquerda/laptops_esq",
      laptop,
      0,
      0
    );
    var mesa_redondaLayer = map.createLayer("mesa_redonda", mesa_redonda, 0, 0);
    var paredesLayer = map.createLayer("paredes", paredes, 0, 0);
    var cadeirasLayer = map.createLayer("cadeiras", moveis_decoracao, 0, 0);
    var rack_frenteLayer = map.createLayer("rack/rack_frente", rack, 0, -11);
    var plantasLayer = map.createLayer("plantas", moveis_decoracao, 0, 0);

    this.allObstacles = [
      vidro_externoLayer,
      janelas_superioresLayer,
      cadeiras_topoLayer,
      mesas_topoLayer,
      mesa_redondaLayer,
      paredes_internasLayer,
      cadeiras_atras_mesas_dir_topoLayer,
      mesas_frente_paredes_dir_topoLayer,
      cadeiras_frente_mesas_dir_topoLayer,
      laptops_dir_topoLayer,
      cadeiras_atras_mesas_dirLayer,
      mesas_frente_paredes_dirLayer,
      cadeiras_frente_mesas_dirLayer,
      laptops_dirLayer,
      cadeiras_atras_mesas_esqLayer,
      mesas_frente_paredes_esqLayer,
      cadeiras_frente_mesas_esqLayer,
      laptops_esqLayer,
      paredesLayer,
      cadeirasLayer,
      rack_frenteLayer,
      plantasLayer,
    ];

    // make all tiles in obstacles collidable
    this.allObstacles.forEach((o) => o.setCollisionByExclusion([-1]));

    this.createPlayer();
    var rack_fundoLayer = map.createLayer("rack/rack_fundo", rack, 0, 0);

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on trees
    this.allObstacles.forEach((o) => this.physics.add.collider(this.player, o));

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

    this.createAttendant();

    // // add collider
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawns,
    //   this.onMeetEnemy,
    //   false,
    //   this
    // );
  }


  createPlayer() {
    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [2, 8, 2, 14],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 6, 0, 12],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(500, 400, "player", 6);
  }

  createAttendant() {

    // our player sprite created through the phycis system
    this.attendant = this.physics.add.sprite(500, 260, "player", 9);
    this.attendant.body.setAllowGravity(false);
    this.attendant.body.setImmovable(true);
    this.physics.add.collider(
      this.player,
      this.attendant,
      this.startConversationAttendant
    );

    this.allObstacles.forEach((o) =>
      this.physics.add.collider(this.attendant, o)
    );
  }

  getDistance = function (sprite1, sprite2) {
    var dx = sprite1.x - sprite2.x;
    var dy = sprite1.y - sprite2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  setBaloonPosition = function (spriteTarget) {
    if (spriteTarget == null) return;
    const worldView = _self.cameras.main.worldView;
    const spriteBounds = spriteTarget;
    const y =
      spriteBounds.y +
      _self.phaser_game?.getBoundingClientRect()?.top -
      worldView.y -
      (_self.convBaloon.offsetHeight + 40);
    const x =
      spriteBounds.x +
      _self.phaser_game?.getBoundingClientRect()?.left -
      worldView.x -
      32;
    _self.convBaloon.style.top = y + "px";
    _self.convBaloon.style.left = x + "px";
    _self.convBaloon.style.position = "absolute";
  };

  showDialog = function (dialog, spriteTarget, spriteOrigin) {
    console.log('showDialog()');
    console.log({ dialog, spriteTarget, spriteOrigin })
    _self.convBaloon.hidden = true;
    window.setTimeout(() => {
      _self.convBaloon.className = "bubble bubble-bottom-left shadowed fade-in-bubble";
      _self.convBaloon.hidden = false;
    }, 100);
    _self.setBaloonPosition(spriteTarget);
    _self.dialogStatus = {
      spriteBot: spriteTarget,
      player: spriteOrigin,
      playerDialog: (_self.dialogStatus?.playerDialog) ? _self.dialogStatus.playerDialog : null,
      definition: dialog,
    };

    if (dialog.value) _self.convBaloon.innerText = (dialog.visited && dialog.secondValue !== undefined) ? dialog.secondValue : dialog.value;

    if (Array.isArray(dialog.options) && dialog.options.length > 0) {
      _self.buildOptions(dialog, (result) => {
        if (result == null) return;
      });
    }
    else {
      _self.hidePlayerDialog();
    }

  };

  hideConversation = function () {
    console.log('hideConversation()')
    _self.hidePlayerDialog();
    _self.dialogStatus = {
      player: null,
      spriteBot: null,
      playerDialog: null,
      definition: null
    };
    _self.convBaloon.className = "bubble bubble-bottom-left shadowed";
    _self.convBaloon.className = "bubble bubble-bottom-left shadowed fade-out-bubble";
    window.setTimeout(() => {
      _self.convBaloon.hidden = true;
    }, 100);
  }

  hidePlayerDialog = function () {
    if (_self.dialogStatus?.playerDialog != null) {
      _self.dialogStatus.playerDialog.className = "fade-out-bubble";
      _self.dialogStatus.playerDialog.hidden = true;
      if (_self.dialogStatus?.playerDialog != null)
        document.body.removeChild(_self.dialogStatus?.playerDialog);
      _self.dialogStatus.playerDialog = null;
    }
  }


  buildOptions = function (dialog, completed) {
    console.log('buildOptions()');
    if (!Array.isArray(dialog.options)) {
      completed(null);
      return;
    }
    if (dialog.options.length == 0) {
      completed(null);
      return;
    }

    let optionsElement: YssyElement | null = null;
    const gameRect = _self.phaser_game?.getBoundingClientRect();
    if (_self.dialogStatus.playerDialog == null) {
      optionsElement = new YssyElement();
      console.log(_self.phaser_game?.getBoundingClientRect());
      optionsElement.style.width = gameRect?.width - 60 + "px";
      optionsElement.style.left = gameRect?.x + 20 + "px";

      document.body.appendChild(optionsElement);
      _self.dialogStatus.playerDialog = optionsElement;
    }
    else {
      optionsElement = _self.dialogStatus.playerDialog;
    }
    while (optionsElement.firstChild) optionsElement.removeChild(optionsElement.firstChild);
    dialog.options.map(_self.executeOption);
    optionsElement.style.top = (gameRect?.y + gameRect?.height) - (optionsElement.offsetHeight + 20) + "px";
  };

  executeOption = (option) => {
    let button = document.createElement('button');
    button.innerText = option.text;
    button.onclick = () => {
      if (!Array.isArray(option.actions)) {
        _self.hideConversation();
        return;
      }
      if (option.actions.length === 0) {
        _self.hideConversation();
        return;
      }
      option.actions.forEach(_self.executeAction)
    };
    _self.dialogStatus.playerDialog?.appendChild(button);
  };

  executeAction = (action) => {
    if (Object.prototype.toString.call(action.type) !== '[object String]') {
      console.error('action não possui type');
      console.error(action);
      return;
    }
    if (action.type === 'response')
      _self.showDialog(action, _self.dialogStatus.spriteBot, _self.dialogStatus.player);

  };

  startConversationAttendant(player, attendant) {
    if (
      _self.dialogStatus !== null &&
      _self.dialogStatus?.definition !== dialogs.dialog_welcome
    )
      _self.showDialog(dialogs.dialog_welcome, _self.attendant, _self.player);
    dialogs.dialog_welcome.visited = true;
  }

  update() {
    //console.log("update(MainScene);");
    //    this.controls.update(delta);

    this.player.body.setVelocity(0);
    this.attendant.body.setVelocity(0);

    //console.log({ player: this.player, attendant: this.attendant });

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(this.cursors.left.shiftKey ? -160 : -80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(this.cursors.right.shiftKey ? 160 : 80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(this.cursors.up.shiftKey ? -160 : -80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(this.cursors.down.shiftKey ? 160 : 80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }

    if (this.dialogStatus?.spriteBot != null) {
      this.setBaloonPosition(this.dialogStatus?.spriteBot);
      let distance = this.getDistance(this.dialogStatus?.spriteBot, this.player);
      if (distance > 64) {
        this.hideConversation();
      }
      //else if (this.waitToHideConversation > 0)
      //  window.clearTimeout(this.waitToHideConversation);
    }


  }
}
