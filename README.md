# Node.js Web Jade Scaffold

[![Build Status](https://travis-ci.org/rodrigogs/nodejs-web-jade-scaffold.svg?branch=master)](https://travis-ci.org/rodrigogs/nodejs-web-jade-scaffold)
[![Code Climate](https://codeclimate.com/github/rodrigogs/nodejs-web-jade-scaffold/badges/gpa.svg)](https://codeclimate.com/github/rodrigogs/nodejs-web-jade-scaffold)
[![Dependency Status](https://david-dm.org/rodrigogs/nodejs-web-jade-scaffold.svg)](https://david-dm.org/rodrigogs/nodejs-web-jade-scaffold)
[![devDependency Status](https://david-dm.org/rodrigogs/nodejs-web-jade-scaffold/dev-status.svg)](https://david-dm.org/rodrigogs/nodejs-web-jade-scaffold#info=devDependencies)

## Structure
```
project
├── app
│   ├── controllers
│   │   ├── api
│   │   │   └── example.js
│   │   └── example.js
│   │
│   ├── models
│   │   └── example.js
│   │
│   ├── public
│   │   ├── javascript
│   │   │   └── example.js
│   │   └── stylesheets
│   │       └── example.css
│   │
│   ├── routes
│   │   ├── api
│   │   │   └── example.js
│   │   └── example.js
│   │
│   ├── services
│   │   └── example.js
│   │
│   ├── utils
│   │   └── example.js
│   │
│   └── views
│       ├── error.jade <-- Error template
│       ├── includes
│       │   ├── footer.jade <-- Footer template
│       │   ├── messages.jade <-- Flash messages template
│       │   ├── meta.jade <-- General meta content
│       │   ├── facebook-meta.jade <-- Facebook meta data
│       │   └── twitter-cards.jade <-- Twitter meta data for whitelisting
│       ├── layouts
│       │   └── default.jade <-- Default layout
│       └── index.jade <-- Index template
│
├── bin
│   └── www <-- HTTP server runner
│
├── config
│   ├── config.json <-- General configurations file
│   ├── mongoose.js <-- Mongoose connection configuration
│   ├── passport.js <-- Passport routes and strategies
│   └── routes.js <-- General routes
│
├── locales <-- Locale files should be referenced in config.json file
│   ├── en.json
│   ├── pt-br.json
│   └── pt.json
│
├── main.js <-- Main app file
├── tests.js < -- Tests file
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

#### Environment variables
* IP
    - export IP="192.168.0.1"
* PORT
    - export PORT="8080"
* SESSION_SECRET
    - export SESSION_SECRET="mysecret"
* DATABASE_URL
    - export DATABASE_URL="mongodb://localhost:27017/example"
* FACEBOOK_APP_ID: See https://developers.facebook.com/docs/apps/register#app-id
    - export FACEBOOK_APP_ID="myfacebookid"
* FACEBOOK_APP_SECRET: See https://developers.facebook.com/docs/apps/register#app-secret
    - export FACEBOOK_APP_SECRET="myfacebooksecret"
* TWITTER_CONSUMER_KEY
    - export TWITTER_CONSUMER_KEY="mytwitterconsumerkey"
* TWITTER_CONSUMER_SECRET
    - export TWITTER_CONSUMER_SECRET="mytwitterconsumersecret"
* GOOGLE_CLIENT_ID
    - export GOOGLE_CLIENT_ID="mygoogleclientid"
* GOOGLE_CLIENT_SECRET
    - exports GOOGLE_CLIENT_SECRET="mygoogleclientsecret"
* GITHUB_CLIENT_ID
    - export GITHUB_CLIENT_ID="mygithubclientid"
* GITHUB_CLIENT_SECRET
    - exports GITHUB_CLIENT_SECRET="mygithubclientsecret"
* LINKEDIN_KEY
    - export LINKEDIN_KEY="mylinkedinkey"
* LINKEDIN_KEY
    - export LINKEDIN_SECRET="mylinkedinsecret"
* INSTAGRAM_CLIENT_ID
    - export INSTAGRAM_CLIENT_ID="myinstamgramclientid"
* INSTAGRAM_CLIENT_SECRET
    - export INSTAGRAM_CLIENT_SECRET="myinstamgramclientsecret"

#### Project configuration
* Project/config/config.json
    - DATABASE.RECONNECT: Enable or disable auto reconnection.
    - DATABASE.RECONNECTION_INTERVAL: Interval for auto reconnection tries.
    - LOCALES: Reference your locale files in the locale folder. Only the locales defined here will be use by the app.
    - HTTP_LOG_CONFIG: See https://github.com/expressjs/morgan#predefined-formats
    - AUTH.ENABLED: Enable or disable authentication.
    - AUTH.LOCAL.ENABLED: Enable or disable local authentication.
    - AUTH.FACEBOOK.ENABLED: Enable or disable Facebook authentication.
    - AUTH.FACEBOOK.PROFILE_FIELDS: Facebook profile fields wanted.
    - AUTH.FACEBOOK.OPTIONS: Facebook API options.
    - AUTH.TWITTER.ENABLED: Enable or disable Twitter authentication.
    - AUTH.GOOGLE.ENABLED: Enable or disable Google authentication.
    - AUTH.GOOGLE.OPTIONS: Google API options.
    - AUTH.GITHUB.ENABLED: Enable or disable GitHub authentication.
    - AUTH.LINKEDIN.ENABLED: Enable or disable Linkedin authentication.
    - AUTH.LINKEDIN.OPTIONS: Linkedin api options.
    - AUTH.INSTAGRAM.ENABLED: Enable or disable Instagram authentication.

## Launching

First start MongoDB if you don't have a running instance

> mongod

#### Development

> npm start

#### Production

> node bin/www

#### Test

> npm test

[Running Example](http://nodejs-web-jade-scaffold.herokuapp.com/)

## TODO

* User/Role management
* More tests

## License

[Licence](https://github.com/rodrigogs/nodejs-web-jade-scaffold/blob/master/LICENSE) © Rodrigo Gomes da Silva
