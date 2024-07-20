# angular-boilerplate

This repo is intended to allow spooling up Angular projects in a monorepo rapidly, with a minimum of configuration.

## Current features
* Angular 16 (with Node 18)
* Parallel server/client execution
* Bare-bones api proxy to the back-end
* SASS boilerplate included
* Frontend environment detection/switching
* Auto-unsub from subscriptions and component variables
* Heroku deployment
* Google Analytics
* Cookie API
* Service worker to persist app and manage versions
* Hot module replacement for faster dev iteration
* Typescript with node for back-end
* Client & Server unit testing via jasmine
* Internationalization (i18n) with ngx-translate

## Future features:
* Server testing for Windows (currently not working atm)
* e2e testing with (testcafe/puppeteer?) + snapshots
* CI/CD (jenkins, sonar, etc?)
* Tree-shaking/build optimization
* Benchmark memory usage and response times (throttled for mobile) in tests
* Google Analytics reports on site activity
* Feature flags
* IndexedDB for offline storage
* Websockets to reconcile disparities between server and local data
* public api with GraphQL
* DB caching for external requests AND similar DB api calls (solr or the like)
* Ionic & Electron integration
* Elf state management
* Immutable.js to minimize mutation
* Auth-agnostic (or maybe just Firebase) user management (emails and password resetting and deliverability)

## Quick start

### Node

Install node 18.12.1. Recommended to install NVM to manage node versions.

Install NPM 8.19.2 (should be bundled with node; later versions have caused problems).

### Angular cli

Install Angular CLI to allow executing commands: `npm i -g @angular/cli`

### Install modules

From the root, run `npm ci --workspaces`

### Environment variables

Create your `.env` file from the `.env.example` **and never commit sensitive information like API keys or passwords or usernames or email addresses**


### git branches

Develop against branches from dev feature branch using prefix `feature/`. Main is for production releases, staging is to test prod.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the front- and back-end concurrently. See above.  
**This is the preferred method of running a local**

### `npm run client`

Runs only the front-end of the app (on port 4200) in development mode.  
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.

### `npm run server`

Runs only the back-end of the app (on port 4201) in development mode.  
Open [http://localhost:4201](http://localhost:4201) to view it in the browser.

This will display the API responses.

### unit testing

tbd

## Deployment

### Install Heroku CLI

* mac (requires homebrew): `brew tap heroku/brew && brew install heroku`
* linux: `sudo snap install --classic heroku`

### Add Heroku to Git

`heroku git:remote -a <APP_NAME>-dev`
`git remote rename heroku dev`  
`heroku git:remote -a <APP_NAME>-staging`  
`git remote rename heroku staging`  
`heroku git:remote -a <APP_NAME>`  
`git remote rename heroku production`

### Deploy dev

`git push dev dev:main`

### Deploy staging

from staging branch:  
`git push staging staging:main`

### Deploy production

from main branch:  
`git push production main:main`