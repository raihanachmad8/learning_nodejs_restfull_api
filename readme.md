# NODEJS RESTFULL API

Welcome to Project NodeJs Restfull API!

This repository contains a Node.js project that does User Management.

## Authors

- [@raihanachmad8](https://www.github.com/raihanachmad8)


## Getting Started

To get started with this project, follow the steps below to install the required dependencies.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install Dependencies](#install-dependencies)
- [Usage](#usage)
- [API SPEC](#api-spec)
- [Contributing](#contributing)
- [License](#license)

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

- Node.js: [Download and Install Node.js](https://nodejs.org/): If you don't have Node.js installed, you can download and install it from the official
- npm: [Download and Install npm](https://www.npmjs.com/get-npm): This project utilizes various npm packages. You can download and install npm by following the instructions
- pnpm (recomendation): [Download and Install pnpm](https://pnpm.io/id/installation): Alternatively, you can use pnpm as a package manager. To install pnpm, refer to the installation guide

## Install Dependencies

To get started with this project, you need to install both runtime and development dependencies. You can do this using the following steps:

- if using NPM
``` bash 
npm i

```
after that

```bash
npx prisma init
```
- if using PNPM
``` bash 
pnpm i
```
after that:
``` bash 
pnpm prisma init
```

alternative dependency: 

### Runtime Dependencies

``` bash
npm install joi express bcrypt uuid winston
```

- [joi](https://joi.dev/): A library for data validation.
- [express](https://expressjs.com/): A web application framework for Node.js.
- [bcrypt](https://www.npmjs.com/package/bcrypt): A library for hashing passwords.
- [uuid](https://www.npmjs.com/package/uuid): A library for generating UUIDs.
- [winston](https://www.npmjs.com/package/winston): A versatile logging library.

### Development Dependencies
``` bash
npm install --save-dev @types/express @types/bcrypt @types/uuid @types/jest @types/supertest supertest jest prisma babel-jest @babel/preset-env
```

- [@types/express](https://www.npmjs.com/package/@types/express): Type definitions for Express.
- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt): Type definitions for bcrypt.
- [@types/uuid](https://www.npmjs.com/package/@types/uuid): Type definitions for UUID.
- [@types/jest](https://www.npmjs.com/package/@types/jest): Type definitions for Jest.
- [@types/supertest](https://www.npmjs.com/package/@types/supertest): Type definitions for Supertest.
- [supertest](https://www.npmjs.com/package/supertest): A library for testing HTTP assertions.
- [jest](https://jestjs.io/): A testing framework.
- [prisma](https://www.prisma.io/): Prisma ORM for database interactions.
- [babel-jest](https://babeljs.io/setup#installation): Babel integration with Jest.
- [@babel/preset-env](https://babeljs.io/docs/babel-preset-env): Babel preset for compiling modern JavaScript.


## API SPEC
- [User Api](https://www.github.com/raihanachmad8/nodejs-restfull-api/docs/API/User.md)
- [Address Api](https://www.github.com/raihanachmad8/nodejs-restfull-api/docs/API/Address.md)
- [Contact Api](https://www.github.com/raihanachmad8/nodejs-restfull-api/docs/API/Contact.md)