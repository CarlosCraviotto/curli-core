# curli-core
The core for a library to handle modules on the top of Express and build a complete custom framework.


[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-core.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-core)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-core/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-core?branch=master)


### Motivation
- Create a framework that doesn't want a wedding, just a hookup

- Doesn't matter if you want MVC, Spaghetti Code or CQRS, you can do it.

- Easy to extend

- Build it using modules and modules definers.

  

### Installation

Install by `npm`

```sh
npm install --save curli-core
```
#### Basic Usage

```typescript
import {
  CurliApplication,
  BootersModulesDefiner,
  ServicesModulesDefiner,
  ConfigModulesDefiner
} from 'curli-core';

import {AppModule} from "./App/Infrastructure/AppModule";
import {UserModule} from "./Users/Infrastructure/UserModule";
import {ListModule} from "./Lists/Infrastructure/ListModule";

  const app = new CurliApplication({
    port: 3000,
    environment: 'local'
  });

  app.addModulesDefiner(new BootersModulesDefiner(app));
  app.addModulesDefiner(new ServicesModulesDefiner(app));
  app.addModulesDefiner(new ConfigModulesDefiner(app));

  app.addModule(new AppModule());
  app.addModule(new UserModule());
  app.addModule(new ListModule());

  app.startApp();
  app.initServer(function (url: string) {
    console.log(`Server is running at ${url}`);
  });

```


### Commands
 - `npm run build`: Build the project (Curli framework).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.

### License
MIT