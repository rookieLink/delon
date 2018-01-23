---
order: 0
title:
  en-US: Getting Started
  zh-CN: 开始使用
type: Basic
---

## Foreword

ng-alain is a production-ready solution for admin interfaces based on ng-zorro-antd, which should help you buid angular project to be faster and simpler.

## Version

| package name | version | next version |
| ------------ |:-----:|:----------:|
| @delon/theme | [![NPM version](https://img.shields.io/npm/v/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme) | [![NPM version](https://img.shields.io/npm/v/@delon/theme/next.svg)](https://www.npmjs.com/package/@delon/theme) |
| @delon/abc | [![NPM version](https://img.shields.io/npm/v/@delon/abc.svg)](https://www.npmjs.com/package/@delon/abc) | [![NPM version](https://img.shields.io/npm/v/@delon/abc/next.svg)](https://www.npmjs.com/package/@delon/abc) |
| @delon/acl | [![NPM version](https://img.shields.io/npm/v/@delon/acl.svg)](https://www.npmjs.com/package/@delon/acl) | [![NPM version](https://img.shields.io/npm/v/@delon/acl/next.svg)](https://www.npmjs.com/package/@delon/acl) |
| @delon/auth | [![NPM version](https://img.shields.io/npm/v/@delon/auth.svg)](https://www.npmjs.com/package/@delon/auth) | [![NPM version](https://img.shields.io/npm/v/@delon/auth/next.svg)](https://www.npmjs.com/package/@delon/auth) |
| @delon/mock | [![NPM version](https://img.shields.io/npm/v/@delon/mock.svg)](https://www.npmjs.com/package/@delon/mock) | [![NPM version](https://img.shields.io/npm/v/@delon/mock/next.svg)](https://www.npmjs.com/package/@delon/mock) |
| @delon/cache | [![NPM version](https://img.shields.io/npm/v/@delon/cache.svg)](https://www.npmjs.com/package/@delon/cache) | [![NPM version](https://img.shields.io/npm/v/@delon/cache/next.svg)](https://www.npmjs.com/package/@delon/cache) |
| @delon/cli | [![NPM version](https://img.shields.io/npm/v/@delon/cli.svg)](https://www.npmjs.com/package/@delon/cli) | [![NPM version](https://img.shields.io/npm/v/@delon/cli/next.svg)](https://www.npmjs.com/package/@delon/cli) |

## Installation

There are two ways to install:

### Use the Command Line

Depend on `@delon/cli`, [How install?](http://ng-alain.com/docs/cli)

```bash
ng new -c=@delon/cli my-app
```

### Clone the Git Repository

```bash
$ git clone --depth=1 https://github.com/cipchk/ng-alain.git my-project

$ cd my-project
```

## Scaffolding

ng-alain is a standard Angular cli project, and have built the following template. which should help you prototyping production-ready admin interfaces.

```
├── src
│   ├── app
│   │   ├── core                                # Core module
│   │   │   ├── i18n
│   │   │   ├── net
│   │   │   │   └── default.interceptor.ts      # HTTP Interceptor
│   │   │   ├── services
│   │   │   │   └── startup.service.ts          # Startup Service
│   │   │   └── core.module.ts
│   │   ├── layout                              # Common Layouts
│   │   ├── routes
│   │   │   ├── **                              # Your Business
│   │   │   ├── routes.module.ts                # Router module file of business
│   │   │   └── routes.ts                       # Router Register
│   │   ├── shared
│   │   │   └── core.module.ts                  # Shared module file
│   │   ├── app.component.ts                    # Root component
│   │   └── app.module.ts                       # Root module file
│   ├── assets                                  # Local static files
│   ├── environments                            # Environments config
│   ├── styles                                  # Theme config
└── └── style.less                              # Global Stylesheet
```

## Development

Install Dependencies

```bash
$ npm install
```

```bash
$ npm start
```

or use HMR mode

```bash
$ npm run serve:hmr
```

open [//localhost:4200](//localhost:4200), If you see the following page then you have succeeded.

![](./assets/screenshot/desktop.png | width=700)
