# <p align="center">Rabbitmq-example</p>
<p align="center">
  <img src="https://github.com/lurickardo/rabbitmq-example/assets/34722198/d76d25c6-a83b-4e63-a640-ce48de12efa4" alt="Logo" width="250">
</p>
<p align="center">Simple example of sending an email using messaging with <a href="https://www.rabbitmq.com" target="_blank">RabbitMQ</a>.</p>
<p align="center">
  <a><img src="https://img.shields.io/badge/license-MIT-green" alt="Package License" /></a>
  <a href="https://www.npmjs.com" target="_blank"><img src="https://img.shields.io/badge/npm-v10.2.3-green?logo=npm" alt="NPM Version" /></a>
  <a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-v20.10.0-green?logo=nodedotjs" alt="Node Version"></a>
  <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/typescript-v5.3.3-green?logo=typescript" alt="Typescript Version"></a>
  <a href="https://biomejs.dev" target="_blank"><img src="https://img.shields.io/badge/biome-v1.5.3-green?logo=biome" alt="Biome Version"></a>
  <a href="https://zod.dev/" target="_blank"><img src="https://img.shields.io/badge/zod-v3.22.4-green?logo=zod" alt="Zod Version"></a>
</p>

# Diagram
<img src="https://github.com/lurickardo/rabbitmq-example/assets/34722198/c03b9aa4-6d2d-48a2-b9eb-09fb959aa1d1" alt="Diagram" width="500">

# Libraries

- NodeJS
- Typescript
- AMQP
- Nodemailer
- Biome

## Installation

```bash
## Configure the "publisher" and "receiver" folder environment variables correctly before running the project
$ docker build -t server-rabbitmq .
$ docker run -d --name container-rabbitmq -p 5672:5672 -p 15672:15672 server-rabbitmq
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production
$ npm run build
$ npm run start:prod
```
