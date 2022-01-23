import 'phaser';
import MainScene from './scenes/MainScene';
import BootScene from './scenes/BootScene';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 650;

const config = {
  type: Phaser.AUTO,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [BootScene, MainScene],
};

window.addEventListener('load', () => {
  new Phaser.Game(config);
});
