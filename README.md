<!-- PROJECT SHIELDS -->

<!-- [![Contributors][contributors-shield]][contributors-url] -->

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <a href="https://github.com/dscnitrourkela/react-boilerplate">
    <img src="repoImages/logo.png" alt="Logo" width="130">
  </a>

  <h3 align="center">React Template</h3>

  <p align="center">
    A React Template with custom webpack config
    <br />
    <br />
    <!-- <a href="https://signit.dscnitrourkela.org">View Demo</a> -->
    ·
    <a href="https://github.com/riteshsp2000/react-boilerplate/issues">Report Bugs</a>
    .
    <a href="https://github.com/riteshsp2000/react-boilerplate/issues">Add Features</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
      </ul>
        <li><a href="#built-with">Built With</a></li>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#contribution-guidlines">Contribution guidlines</a></li>
        <li><a href="#local-repository-setup">Local Repository Setup</a></li>
        <li><a href="#running-the-project">Running the project</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

## About The Project

A React Template with custom webpack configuration along with support for code splitting. Following are the features specific to React.

- Individual Page code splitting support.
- Uses functional component style.
- Support for some commonly used Hooks.
- Well thought out directory structure for large scale projects.
- Supports testing using Jest and React Testing Library

Following is a list of plugins used for configuring [Webpack](https://webpack.js.org/)

- [uglify-js-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin) - For minification of Javascript
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) - For cleaning of the build folder
- [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - For visualizing size of webpack output files
- [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin) - For copying the static directory into build directory
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) - For simplifying the creation of HTML files to serve your bundles
- [brotli-webpack-plugin](https://www.npmjs.com/package/brotli-webpack-plugin) - For better compression using the Brotli compression algorithm

### Built With

Following technologies and libraries are used for the development of this
template

- Routing using [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- Global State Mananagement with the help of [redux](https://redux.js.org/)
- Linting with [eslint](https://eslint.org/) and formating using [prettier](https://prettier.io/)
- Testing support with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- Uses [yarn](https://yarnpkg.com/) for faster installs

<!-- GETTING STARTED -->

## Getting Started

To setup the project locally follow the steps below

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)

  ```sh
  # Homebrew
  brew install nodejs

  # Sudo apt
  sudo apt install nodejs

  # Packman
  pacman -S nodejs

  # Module Install
  dnf module install nodejs:<stream> # stream is the version

  # Windows (chocolaty)
  cinst nodejs.install

  ```

- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

```sh
  npm install --global yarn
```

- [Git](https://git-scm.com/downloads)

```sh
  # Homebrew
  brew install git

  # Sudo apt
  apt-get install git

  # Packman
  pacman -S git

  # Module Install (Fedora)
  dnf install git

```

### Contribution guidlines 🎃

---

Our Slack Community: [Slack Invite](http://bit.ly/NITRDevs) <br>

`Contributions are welcome 🎉🎉`

### Local Repository Setup

Please refer to the project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your local system
3.  **Commit** changes to your own separate branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that we can review your changes

NOTE 1: Please abide by the [Contributing Guidelines](https://github.com/dscnitrourkela/project-guava-web/blob/master/CONTRIBUTING.md).

NOTE 2: Please abide by the [Code of Conduct](https://github.com/dscnitrourkela/project-guava-web/blob/master/CODE_OF_CONDUCT.md).

### Running the project.

The project uses Yarn and not NPM. It is strictly advised to stick with Yarn so as to avoid dependency conflicts down the line.

```
## Checkout into the project client directory
cd client

## Install Dependencies
yarn install

## Run the Project
yarn develop

```

Following are the commands to remove/add new dependencies using yarn

```
## Add a new Package
yarn add package_name

## Remove an existing Package
yarn remove package_name

## Save Package as a Dev Dependency
yarn add -D package_name
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/riteshsp2000@/react-boilerplate?style=for-the-badge
[contributors-url]: https://github.com/riteshsp2000@/react-boilerplate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/riteshsp2000@/react-boilerplate?style=for-the-badge
[forks-url]: https://github.com/riteshsp2000/react-boilerplate/network/members
[stars-shield]: https://img.shields.io/github/stars/riteshsp2000/react-boilerplate?style=for-the-badge
[stars-url]: https://github.com/riteshsp2000/react-boilerplate/stargazers
[issues-shield]: https://img.shields.io/github/issues/riteshsp2000/react-boilerplate?style=for-the-badge
[issues-url]: https://github.com/riteshsp2000/react-boilerplate/issues
[license-shield]: https://img.shields.io/github/license/riteshsp2000/react-boilerplate?style=for-the-badge
[license-url]: https://github.com/riteshsp2000/react-boilerplate/blob/main/LICENSE.txt
