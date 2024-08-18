

# Project: Users-Char-Number-App

## Description

The project is a backend Rest-API for inserting / updating a character or a number for a specific user. 
Additionally, there is another Rest-API for retrieving users by their userId.

## Project components
- [Node js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Nest](https://github.com/nestjs/nest) framework TypeScript.
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/) runs in a Docker container for database usage.

## Installation guide

1. Install [Redis](https://redis.io/) (via your machine or via on [Docker](https://www.docker.com/) [The [Docker](https://www.docker.com/) installation below])
2. Install the `users-char-number-app` Rest-API application. 

## Installation

To install [Redis](https://redis.io/) on your machine:

- Install Redis on [Windows](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)
- Install Redis on [Linux](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/)
- Install Redis on [Mac](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/)

To install the application, please run:

```bash
$ npm install
```

## Running the app on desktop

To run the application, please execute:

```bash
# development mode:
$ npm run start

# watch mode:
$ npm run start:dev

# production mode:
$ npm run start:prod
```

## Test

To run the unit tests, please execute:

```bash
# run the unit tests:
$ npm run test
```

## Run on docker

To run the project in a Docker container:

- Build the Redis docker image:

```bash
docker run -d --name redis-storage -p 6379:6379  redis/redis-storage-server:latest
```

- Verify that the Redis container is running:

```bash
docker ps
```

- Connect to the Redis storage:

```bash
$ docker exec -it 885 sh
> redis-cli
```

- Build the docker image:

```bash
docker build -t users-char-number-app .
```

- Run the docker container:

```bash
docker run -p 3000:3000 users-char-number-app
```

- Verify that the application is running:

Open your web browser or use like `curl` to verify that the application is runnin correctly:

```bash
http://localhost:3000/
```



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Nest Js is a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

