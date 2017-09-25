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

For application it will attemt to set:

* `.displayName` => `/name`, display name being a cordova convention

For plugins it will additionally attempt to set:

* `.name` => `/@id`. Note that as a quirk, cordova will trim the npm scope off this when installing.
  This plugin will remove scope from the `/@id` to avoid the issue
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
sync-cordova-xml [--plugin|--config] [--output=plugin.xml] package.json plugin.xml
```

**NOTE**: For convenience the CLI will guess the mode from the 2nd argument
filename. To absolutely force either mode, regardless of filename, use the one
of the flags.

You can add this script to your `package.json` for automatic sync on each `npm version`:

```json
"version": "sync-cordova-xml package.json config.xml --output=config.xml && git add config.xml"
```

## API

### `var resultXml = sync(json, sourceXml, [mode])`

## Install

```sh
npm install sync-cordova-xml
```

## License

[ISC](LICENSE.md)
