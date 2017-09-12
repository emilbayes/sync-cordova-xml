# `sync-cordova-xml`

> Sync Cordova's XML files with your package.json

## Usage

```js
var sync = require('sync-cordova-xml')

sync(require('./package.json'), xmlString, 'plugin')

```

This module will synchronise:

* `.version` => `/@version`
* `.name` => `/name`
* `.description` => `/description`

For plugins it will additionally attempt to set:

* `.name` => `/@id`
* `.license` => `/license`
* `.keywords[]` => `/keywords` joined to comma delimited string

* `.repository.url` => `/repo` (OR simply use `.repository` if string)
* `.bugs.url` => `/issue`
* `.author` as string will be parsed into the next properties
* `.author.name` => `/author`
* `.author.url` => `/author/@href`
* `.author.email` => `/author/@email`

## CLI

```sh
sync-cordova-xml [--plugin] [--output=plugin.xml] package.json plugin.xml
```

You can add this script to your `package.json`:

```json
"version": "sync-cordova-xml package.json config.xml --output=config.xml"
```

## API

### `var resultXml = sync(json, sourceXml, [mode])`

## Install

```sh
npm install sync-cordova-xml
```

## License

[ISC](LICENSE.md)
