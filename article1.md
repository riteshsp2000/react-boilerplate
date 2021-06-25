# Bundling React project using Webpack

## Introduction

This article focuses on bootstraping a react template using webpack. CLI Tools such as create-react-app, next, vue cli, etc provide phenomenal configuration out of the box through which one can generate a project with sane defaults. That being said, seeing how things work under the hood is helpful in light of the fact that sometime you'll have to make some changes to the defaults. In this article we'll try to comprehend what webpack is, the way it is valuable and the different things that we can manage with webpack. Alongside this we'll assemble our own personal React template totally from scratch with a fancy feature of code splitting!

## What is webpack?

Webpack was announced roughly 6 years ago with it releasing its 5th version - v5 in October of 2020. Webpack 1,2,3 kind of built on the backs of one another whereas Webpack 4 was a complete rewrite from the ground up. So a lot of the plugins that worked with earlier version, none of them really worked when you moved to v4. Saying this I should say that Webpack 4 and 5 are super quick and performant and can do a great deal of cool things with all the new plugins and features. It has gotten over 40k stars on Github. So, what exactly is Webpack? Webpack is an opensource Javascript module bundler.

## What is a module bundler?

A module bundler basically builds your dependency tree. So if you were just building a static website you were probably really familiar with either a link tag at the top or a script tag at the bottom. So if you're building a really complex application or a really complex site you're probably used to at this point having to kind of order those link tags or script tags in a specific order. You want the most important thing to be loaded faster and the thing that is dependant upon everything else to be loaded maybe more towards the bottom. The job of a module bundler is to build a graph/tree of all the dependencies. Its job is to go through your files and sniff the stuff out to understand what is dependamt upon what and once it understands that,it builds this tree/graph and it understands the relationship between one file and the other. It handles all the import statements at the top, the export statements at the bottom, those statements is how the module bundler builds the tree.
The next thing it does is it creates static assets or in other sense, it flattens the files.Sometimes it will minify them or uglify them or concatenate them into one file. In this article we are goona talk about how not to concatenate them into one big file and maybe split them into various smaller chunks. Since it creates static assets, we can use things like es6, typescript, sass or all of these languages that are built upon the technologies that we know but the browser isn't there yet.
The special thing about this bundler is that it is specifically for javascript but we can use plugins for html/css. The beauty of Webpack is that it is a Javascript module bundler that you can use for any javascript application like React, AngularJs, Angular, Vue or even Node!

## What is code splitting?

The process of splitting your code into smaller chunks so that you only load what you need when you need it. Webpack also has this process called Tree shaking. So it might happen sometime that you have imported something at the top of your file and haven't used it. If you are using a linter then it might catch it but if for some reason the linter doesn't catch it then webpack will analyze it and remove it off when bundling the code. So tree shaking comes out of the box with webpack but code splitting needs some work.
There are 2 styles or approaches for code splitting.

- My code vs vendor code. (vendor code is nothing but npm. Anything that we download from a third party.)
- Chunking my code at a router level

## Why should you learn webpack?

As I said earlier, it's always good to know how things work under the hood because some day you might had to make changes to the default settings that. Adding on to this, you can use webpack any of your javascript project, no matter the framework or library. Node, React, Angular, Vue, Typescript, etc, you can configure your project with webpack. In simpler terms the following line may explain why use webpack?

```
webpack = bower + grunt + gulp + browserify + browsersync = etc
```

Webpack is a one stop solution for all the different libraries that you have used in the past. Also if you see the trends for webpack vs gulp vs grunt, webpack beats them all by a huge margin. Checkout the graph below.

[![NPM Trends: Webpack v/s Gulp v/s Grunt][./repoimages/npmtrends.png]](https://www.npmtrends.com/gulp-vs-next-vs-webpack-vs-grunt)

With such huge number of people using webpack you also get to have have a huge community to help you around.

## What is babel? Why do we need babel?

The current version of React uses ES6 to ES8 syntax. We need Babel to compile the code written in those syntaxes back to code the browser can understand. Babel is there to ensure backward compatibility, awesome right? We can write our code in the newer cleaner syntaxes and have Babel worry about the rest. First we have to install a couple of dependencies and create a babel config file

```shell
touch babel.config.json

yarn add -D @babel/core @babel/polyfill @babel/preset-env @babel/preset-react babel-core babel-loader babel-cli babel-polyfill babel-preset-react
```

```json
// babel.config.json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## React Application

I have setup a very basic react application with some routes using the react-router-dom library. I have also used React Loadable to achieve the Router level code splitting. Following is the react code (Router setup, rest is plain good old react.)

```jsx
import React from "react";

// Libraries
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

// Components
import ActivityIndicator from "../components/shared/ActivityIndicator";

// Helpers
import createBrowserHistory from "../utils/history";

// Asynchronous Loading of Pages in different chunks
const AsyncHome = Loadable({
  loader: () => import("./Home"),
  loading: ActivityIndicator,
});

const AsyncAbout = Loadable({
  loader: () => import("./Home"),
  loading: ActivityIndicator,
});

function App() {
  return (
    <Router history={createBrowserHistory}>
      <Switch>
        <Route path="/" exact component={AsyncHome} />
        <Route path="/about" exact component={AsyncAbout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
```

- A basic router configuration is setup using the React Router DOM library.
- ActivityLoader is nothing but a fancy loader (spinner)
- We have made use of React Loadable library. It provides a function which require 2 parameters, the first being what you want to load and the other being a loader element that you want to show when the chunk is being downloaded.

## Lets set webpack up!

People tend to have multiple webpack files, one for development, one for production, one for testing and many more. How I like to do it is, maintain just one file and export a function from it that handles all the cases. As you can see from below, im passing an environment variable from my scripts which determines which mode I am and configures webpack accordingly. Nice and simple, isn't it?

```json
{
  "scripts": {
    "build:dev": "webpack --env development",
    "build:prod": "webpack -p --env production",
    "develop": "webpack-dev-server --env development",
    "start": "node server/server.js"
  }
}
```

You will be using a package called webpack-dev-server which is basically a client side server with the ability to live reload solely for development purposes. So in your webpack file, you'll be exporting a function which has parameter called `env` which is populated through the script. Using this parameter you'll be determining the environment which is then stored in variables called `isDev` and `isProd`.

```js
// webpack.config.js file
module.exports = (env) => {
  console.log('WEBPACK ENV: ", env);

  const isProd = env === 'production';
  const isDev = env === 'development';
}
```

The next few steps are configuring the plugins and setting up other things that we'll be using. Our setup will be divided into 3 major parts:

1. Plugins Setup: Webpack supports a plethora of different plugins which we can use to configure a certain task.
2. General config: Configuration that is common to all the environments.
3. Env specific config: Configuration particular to one environment - in our case it is development and production.

## Plugin Setup

1. Setup support for environment variables.

- First install a package called dotenv. Dotenv is used to parse the content of env files and present it as an object with keys and values.

```shell
yarn add dotenv
```

- Following is the code that configures the support for env variables. So we get the keys and values from the file and store it under envVars variables. We also manually set the NODE_ENV variable.

```js
let envVars;

envVars = dotenv.config().parsed || {};
envVars.NODE_ENV = env;
```

- Next we loop through the envVars object and prefix each key with `process.env`

```js
// reduce it to a nice object, the same as before
const envKeys = Object.keys(envVars).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
  return prev;
}, {});
```

- Once we have our final object up and ready, we configure it with webpack.

```js
// Maps environment variables from .env file to the project
const DefinePlugin = new webpack.DefinePlugin(envKeys);
```

2. Clean Plugin

- Clean plugin basically clears your output folder before building the new copy into it.

```shell
yarn add -D clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Cleans 'dist' folder everytime before a new build
const CleanPlugin = new CleanWebpackPlugin({
  root: __dirname,
  verbose: true,
  dry: false,
});
```

- `root` is basically the location where the output folder is going to be. Enabling `verbose` writes logs to the console. `dry` simulates the removal of files. (which we dont want)

3. Analyzer Plugin

- One of the cool plugins out there. It creates a page which visualizes the size of webpack output files with an interactive zoomable treemap.

```shell
yarn add -D webpack-bundle-analyzer
```

```js
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// Plugin to generate a bundle map with sizes
const AnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: "static", // Set to 'disabled' if you dont want to visualize the output
});
```

4. HTML Plugin

- If you don't have this, none of this will work. So we have a template html file which is used by webpack. Since we have code splitting in our project, it'll dynamically import the script tags accordingly.

```shell
yarn add -D html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HTMLPlugin = new HtmlWebpackPlugin({
  template: "template.html",
  chunksSortMode: "none",
  favicon: "./src/assets/static/favicon.ico",
});
```

5. Copy Plugin

- A handy little plugin which after configuring copies all the static files into the build folder.

```shell
yarn add -D copy-webpack-plugin
```

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Plugin to copy assets/static directory to the build
const CopyPlugin = new CopyWebpackPlugin({
  patterns: [{ from: "./src/assets/static", to: "." }],
});
```

## General Config: Lets build webpack!

Alright! We have all our plugins configured! Its now time to build our webpack configuration!
In this part we'll be creating a config object that is returned by out configuration function which configures webpack. Lets start with creating an empty object which we'll keep on populating.

```js
const config = {};
```

1. Entry: Webpack needs the path of the file from where the project is started. We are multiple entries (2 in our case - babel-polyfill and srx/index.js) which creates what is known as a "multi-main entry". This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".

```js
config.entry = ["babel-polyfill", "./src/index.js"];
```

2. Output: Configuring the output configuration options tells webpack how to write the compiled files to disk. Note that, while there can be multiple entry points, only one output configuration is specified.

```js
config.output = {
  path: path.join(__dirname, "/dist"),
  filename: "bundle.js",
};
```

3. Optimization: Here's where the magic happens! Here's the code, we'll go through it.

```js
config.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\]node_modules[\\]/,
        name: "vendor",
        chunks: "initial",
      },
    },
  },
  runtimeChunk: {
    name: "manifest",
  },
  minimizer: [
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        ecma: 8,
        mangle: false,
        keep_classnames: true,
        keep_fnames: true,
      },
    }),
  ],
};
```

- If your remember, earlier we had discussed what vendor is. Vendor is basically npm or any third party code that we have used. All of my vendor code I want to chuck into one initial block. And so they will all get loaded into one group and be loaded into the frontend one time. This file is then cached into your browser there by reducing the size for download substantially after first load.
- If in future we make some updates and add new vendor code, the chunk file name will change which the browser would recognize and then discard the cached file and update it with the new one.
- You can consider our chunks being divided into 3 main categories. The first is the vendor one, the second is the chunk for each route (as per our loadable components) and the third one is the one that runtime handles. So our app requires some initial configuration before even loading the home page. RuntimeChunk handles the code chunk required for this configuration.
- Minimizer is just the way how we are planning to compress our files.

4. Plugins: An array containing all the plugins that we specified above.

```js
config.plugins = [
  CleanPlugin,
  AnalyzerPlugin,
  HTMLPlugin,
  CopyPlugin,
  DefinePlugin,
];
```

5. Loaders:
   Loaders are transformations that are applied to the source code of a module. They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or load inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!

```shell
yarn add -D babel-loader file-loader html-loader style-loader css-loader
```

```js
config.module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      loader: "babel-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|cot)$/,
      loader: "file-loader",
    },
    {
      test: /\.html$/,
      loader: "html-loader",
    },
    {
      test: /\.(css|scss)$/i,
      use: ["style-loader", "css-loader"],
    },
  ],
};
```

6. Resolve:
   These options change how modules are resolved. webpack provides reasonable defaults, but it is possible to change the resolving in detail. Have a look at Module Resolution for more explanation of how the resolver works.

```js
config.resolve = {
  extensions: [".js", ".jsx"],
};
```

## Environment Special Config

1. Production

```js
if (isProduction) {
  config.output = {
    chunkFilename: "[name].[chunkhash].bundle.js",
    filename: "[name].[chunkhash].bundle.js",
    path: path.join(__dirname, "dist"),
  };

  config.mode = "production";
}
```

- Here we are reconfiguring the output setup. The name of the chunkfile will now include a hash which help in updating the browser cash. That is, if any chunk is updated with the new code, the file name will contain a different hash which would then be considered as a new file by the browser thereby flushing the previous file and updating it with the new one. For production ready apps this is a must. We can continue without this in development.
- The bundling mode is set to production which then webpack internally creates a production ready code.

2. Development

```js
if (isDev) {
  config.output = {
    path: path.join(__dirname, "dist"),
    chunkFilename: "[name].bundle.js",
    filename: "[name].bundle.js",
  };

  config.mode = "development";
  config.devtool = "inline-source-map";
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    open: true,
  };
}
```

- For Development, we are using webpack-dev-server to serves the files locally.
- When webpack bundles your source code, it can become difficult to track down errors and warnings to their original location. For example, if you bundle three source files (a.js, b.js, and c.js) into one bundle (bundle.js) and one of the source files contains an error, the stack trace will point to bundle.js. This isn't always helpful as you probably want to know exactly which source file the error came from.
- In order to make it easier to track down errors and warnings, JavaScript offers source maps, which map your compiled code back to your original source code. If an error originates from b.js, the source map will tell you exactly that.
- For this guide, let's use the inline-source-map option, which is good for illustrative purposes.
- The devServer configurations will configure webpack-dev-server.

## Wrapping up

So that's it! You have set up your React project with webpack successfully! We have covered the basics of webpack, its config, plugins and code-splitting. I have setup a complete React Template with other features such as linting and code formatting. You can checkout the template [here](https://github.com/riteshsp2000/react-boilerplate). Feel free to use and customize it!
