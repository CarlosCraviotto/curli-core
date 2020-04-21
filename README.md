# curli-core
The core for a library to handle modules on the top of Express and build a complete custom framework


[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-core.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-core)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-core/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-core?branch=master)


### Motivation
There are a lot of dependency injection libraries for JavaScript/Typescript out there, this is not new.  The one thing we're trying to achieve here is the ability to take advantage of such a library but without coupling it into the application's domain. The main goal here is to create a library that you can use without using third part code into your domains.

### Installation

Install by `npm`

```sh
npm install --save curli-core
```
#### Basic Usage

```typescript
import {CurliApplication} from "curli-core";


//creating the service
const foo = container.get("foo");

```


### Commands
n
 - `npm run build`: Build the project (Curli framework).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.

### License
MIT