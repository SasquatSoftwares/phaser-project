## Phaser TypeScript Arcade Project

This project is a prototype for developing solutions in virtual reality environments using Phaser 3 and TypeScript. It serves as a model pathway for creating arcade-style virtual environments.

### What is it?

This is a Phaser 3 project setup with TypeScript designed to create arcade-style games. The prototype showcases basic character operation in a virtual environment, complete with animations, collisions, and camera follow.

### What is it for?

This project is aimed at developers looking to create virtual reality environments or arcade-style games. It provides a foundation for integrating advanced features and building complex solutions in a scalable manner.

### How to Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/phaser-yssy-project.git
   cd phaser-yssy-project
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

### How to Configure

- Change the `gameName` in `/webpack/webpack.common.js` to your desired game name.
- All your game code should be inside the `/src/scripts` folder.
- All assets (images, sounds, etc.) should be placed inside the `/src/assets` folder. These will be copied to the `/dist` folder during the production build.

### How to Run

1. **Start the local development server (on port 8080):**
   ```bash
   yarn start
   ```

2. **Build the production-ready code to the `/dist` folder:**
   ```bash
   yarn run build
   ```

3. **Serve the production-ready game in the browser:**
   ```bash
   yarn run serve
   ```

### Project Structure

```
/src
  /assets      # Game assets (images, sounds, etc.)
  /scripts     # TypeScript code for the game
    /scenes    # Game scenes
      BootScene.ts
      MainScene.ts
  game.ts      # Main game configuration
/index.html    # Main HTML file
/webpack
  webpack.common.js
  webpack.dev.js
  webpack.prod.js
package.json
```
