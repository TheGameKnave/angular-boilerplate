# angular-boilerplate

This repo is intended to allow spooling up Angular projects in a monorepo rapidly, with a minimum of configuration.

## Current features
* Angular 18 (with Node 20)
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
* Benchmark memory usage and response times (throttled for mobile) in tests
* Internationalization (i18n) with Transloco

## Future features:
* e2e testing with puppeteer + snapshots
* CI/CD (jenkins, sonar, etc?)
* Tree-shaking/build optimization
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

## Tests

### Unit Testing

tbd

### TestCafe end-to-end testing Startup

### `npx testcafe chrome -L --app "npm run dev"`
    This command starts Testcafe in Live mode (-L) while launching the dev server first. 
    if the server is running, do: 
### `npx testcafe chrome`

### Visual disgression testing in Testcafe via testcafe-blink-diff
Run the Testcafe command with more parameters, since 
with this one we're taking screenshots and prepping to compare them.

* `npx testcafe chrome tests -s tests/e2e/screenshots --take-snapshot base`
Takes the base screenshot. Run this once when the site is working.
Be careful when running this, this will overrite the "working" screenshots in the directory.

* `npx testcafe chrome tests -s tests/e2e/screenshots --take-snapshot actual`
Takes an actual screenshot of the current site.
Once taken, we use this to compare wit the "base" working screenshots to check for userflow errors.

* `npx testcafe-blink-diff tests/e2e/screenshots --compare base:actual --open --threshold 0.005`
The CLI command to compare base:actual screenshots for differences.
The report will be in generated/index.html.

* `npm run rebase`
Accept all screenshot diffs and overwrite base comparisons.

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