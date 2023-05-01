# Mad Scoreboard Service
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Consuming npm packages from GitHub's NPM registry
```bash
$ yarn install
```

To consume npm packages from GitHub's NPM registry follow these steps:
- Create a personal access token with the read:packages scope.
- Create or edit an existing ~/.npmrc file to include the following line, replacing TOKEN with your personal access token. For example: //npm.pkg.github.com/:_authToken=TOKEN
- Install the package using the standard yarn add command. For example: yarn add @OWNER/PACKAGE_NAME


An example of a .npmrc file that grants access to the @octokit npm organization:

```bash
@:registry=https://npm.pkg.github.com"
@MAD-Goat-Project:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=AUTH_TOKEN
```
Be carefull while writing the organization name. NPM is not case sensitve so it doesn't matter if you write @MAD-Goat-Project or @mad-goat-project. But yarn is case sensitve so you have to write @MAD-Goat-Project.



