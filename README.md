# dashup-angular-client

The client application for [dashup](https://github.com/dashup/dashup). Built with [AngularJS](https://angularjs.org/) and assembled using [browserify](http://browserify.org) into browser understandable bundles.


## Anatomy of the Application

The application is structured in [CommonJS modules](http://dailyjs.com/2010/10/18/modules) that are bundled via [browserify](http://browserify.org) into a single file. Test cases are written using [jasmine](https://jasmine.github.io/2.0/introduction.html) and executed with [karma](https://karma-runner.github.io).

The application is structured as shown below:

```
root
 │  Gruntfile.js
 │  package.json
 │
 ├──assets
 │   ├──font
 │   ├──img
 │   └──less
 ├──dist
 ├──lib
 │    dashup.js
 │    index.html
 │
 ├──test
 │   ├──config
 │   │    karma.unit.js
 │   │
 │   └──spec
 │        environmentSpec.js
 │
 └──vendor
      angular-route.js
      angular.js
```


The meaning of these folders is as follows:

* `lib`: all `js` + `html` files that comprise the application
* `assets`: fonts, images, less (css) styles
* `test`: test cases, specificly
    * `config`: test related configuration, e.g. `karma.unit.js`
    * `spec`: actual tests, run in the browser via
* `vendor`: stubs for non-CommonJS enabled libraries (AngularJS and friends)


## Setup

You must have [grunt](https://gruntjs.com) installed to test and build the application.

Install all project dependencies via

```
npm install
```

## Development

Execute `grunt` inside the project to perform a complete build including linting and tests.


### Available tasks

To execute the build step only run

```
grunt build
```

or for continuous (áka watch) mode

```
grunt auto-build
```

Building generates distribution ready artifacts into the `dist` directory.


To execute all test run

```
grunt test
```

or for continuous (áka watch) mode

```
grunt auto-test
```


## Links

* [AngularJS](https://angularjs.org/): front-end framework
* [karma](https://karma-runner.github.io): a test runner that executes test in real browsers
* [karma-bro](https://github.com/Nikku/karma-bro): fast browserify support for karma that handles big projects with ease


## License

MIT