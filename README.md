# Template_Fullstack_Typescript_2022

## TODO

- create .env for back-end and front-end (npm install dotenv 'process.env.NAME_VAR)

## Typescript

### Express

1. Install @type/express and @types/node (type def in form of declaration files) & typescript. This package allow you to not define complex module/library types. Package with @types namespaces `npm install -D @type/express @types/node typescript`

2. create the tsconfig.json file with `npx tsc --init` [link](https://aka.ms/tsconfig) Basic configuration :

- target: Allows us to specify the target JavaScript version that the compiler will output

- module: Allows us to use a module manager in the compiled JavaScript code. CommonJS is supported and is a standard in Node.js

- strict: An option that enables strict type-checking options

- esModuleInterop: Allows us to compile ES6 modules to CommonJS modules

- skipLibCheck: If set to true, skips type-checking of default library declaration files

- forceConsistentCasingInFileNames: When set to true, enables case sensitive file naming

- outDir : specifies where the output will be located

`{
  "compilerOptions": {
    "outDir": "./dist"
  }
}`

3. Change file as `index.js` to `index.ts` and add the new type for each module/package

`
// Exemple
import express, { Express, Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
`

4. Watching files changes and build directory.

`Concurrently` allow to run multiple commands like `nodemon` to watch file changes and the `tsc` command to compile the code

`npm install -D concurrently nodemon`

`"scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
  }`

The build command will compile the code in JavaScript inside a dist directory. The dev command is used to run the Node.js server in development mode.

You need to compile the code to run it `npm run build` then `npm run dev`

5. Conclusions

Typescript has its benefits, but make sure to know all the types definitions [link](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types) or [link](https://www.typescriptlang.org/docs/home.html)

### React

1. Basic tsconfig.json for React

`{
  "compilerOptions": {
    "esModuleInterop": true,
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "dom", // API provided by the browser
      "esnext" // es... (JS builtins)
    ],
    "strict": true,
    "sourceMap": true,
    "target": "esnext", //es2018 (es<currentYear-3>)
  },
  "exclude": [
    "node_modules"
  ]
}`

- jsx : tells TS how to treat JSX files

- lib : this option tells TS which libraries will exist in your target environment, so TS implicitly imports their types (make sur it exist)

- sourceMap : enables TS emitting source maps.

- exclude : this option excludes libs from typechecking and transpiling

2. Install webpack, plugins and loaders

`npm i --save-dev webpack webpack-cli webpack-dev-server css-loader html-webpack-plugin mini-css-extract-plugin ts-loader`

webpack.config.js :

`const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};`

- Setting a NODE_ENV var is the typical way of setting a dev/prod mode. See later how to set it in your script.

- HtmlWebpackPlugin generates index.html from a template which we are going to create shortly

- MiniCssExtractPlugin extracts styles to a separate file which otherwise remain in index.html
mode tells webpack if your build is for development or production. In production mode webpack minifies the bundle.

- entry is a module to execute first after your app is loaded on a client. That's a bootstrap that will launch your application.

- output sets the target dir to put compiled files to

- module.rules describes how to load (import) different files to a bundle
test: /\.(ts|tsx)$/ item loads TS files with ts-loader
test: /\.css$/ item loads CSS files

- devtool sets the config for source maps

- plugins contains all plugins with their settings

3. Add script for launching application

`"scripts": {
    "start": "webpack serve --port 3000",
    "build": "NODE_ENV=production webpack"
  }`

4. Install @types/react and @types/react-dom for types definition of React `npm i --save-dev @types/react @types/react-dom` and rename file in .tsx

5. Add Polyfills to API & Browser adaptability

Some popular :

- core-js for missing Set, Map, Array.flatMap etc

- raf for missing requestAnimationFrame

- whatwg-fetch for missing fetch.

`npm i core-js raf whatwg-fetch`

In index.tsx `import 'core-js/features/array/flat-map'
import 'core-js/features/map'
import 'core-js/features/promise'
import 'core-js/features/set'
import 'raf/polyfill'
import 'whatwg-fetch'`

Best option is to make two bundle (old and new environment)

6. Use it : `npm run build` then `npx serve dist`
