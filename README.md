# Phaser Yssy Project

## Como utilizar

```bash
# Install dependencies
$ yarn install

# Start the local development server (on port 8080)
$ yarn start

# Ready for production?
# Build the production ready code to the /dist folder
$ yarn run build

# Play your production ready game in the browser
$ yarn run serve
```

Change the **gameName** in /webpack/webpack.common.js.

All your game code lies inside the **/src/scripts** folder. All assets need to be inside the **/src/assets** folder in order to get copied to /dist while creating the production build. Do not change the name of the index.html and game.ts files.
