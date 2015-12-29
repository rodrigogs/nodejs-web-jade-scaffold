# Node.js Web Jade Scaffold

## Structure
```
project
├── app
│   ├── controllers
│   │   ├── api
│   │   │   └── user.js
│   │   ├── auth.js
│   │   └── index.js
|   |
│   ├── models
│   │   └── user.js
|   |
│   ├── public
│   │   ├── javascript
│   │   │   └── application.js
│   │   └── stylesheets
│   │       ├── cover.css
│   │       └── style.css
|   |
│   ├── routes
│   │   ├── api
│   │   │   └── user.js
│   │   ├── auth.js
│   │   └── index.js
|   |
│   ├── services
│   │   ├── auth.js
│   │   └── index.js
|   |
│   ├── utils
│   │   └── crypt.js
|   |
│   └── views
│       ├── auth
│       │   ├── login.jade
│       │   └── register.jade
│       ├── error.jade
│       ├── includes
│       │   ├── footer.jade
│       │   └── messages.jade
│       ├── index.jade
│       └── layouts
│           ├── default.jade
│           └── main.jade
├── bin
│   └── www <-- HTTP server runner
|
├── config
│   ├── config.json <-- General configuration file
│   ├── mongoose.js
│   ├── passport.js
│   └── routes.js
|
├── locales <-- Locale files should be referenced in config.json file
│   ├── en.json
│   ├── pt-br.json
│   └── pt.json
|
├── main.js <-- Main project file
├── bower.json
├── favicon.ico <-- Website favicon
└── package.json
```

## Setup

### Installation

> npm install

> npm install bower -g

> bower install

> [Install MongoDB](https://www.mongodb.org/downloads)

### Configuration

* Environment variables
    - IP
        - export IP="192.168.0.1"
            - Default is 'localhost'
    - IP
        - export PORT="8080"
            - Default is '3000'
    - SESSION_SECRET
        - export SESSION_SECRET="mysecret"
    - DATABASE_URL
        - export DATABASE_URL="mongodb://localhost:27017/example"
    - HTTP_LOG_CONF
        - export HTTP_LOG_CONF="dev"
            - See: https://github.com/expressjs/morgan#predefined-formats

* Project configuration
    - Project> config> config.json
        - LOCALES: Reference your locale files in the locale folder. Only the locales defined here will be use by the app.

## Launching

> mongod

### Development

> npm start

### Production

> node bin/www

### Test

> npm test

## TODO

* Passport strategies
* User/Role management
* Tests
* Documentation

## License

[Licence](https://github.com/rodrigogs/nodejs-web-jade-scaffold/blob/master/LICENSE) © Rodrigo Gomes da Silva
