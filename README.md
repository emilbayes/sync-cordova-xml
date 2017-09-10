# `sync-cordova-xml`

> Sync Cordova's XML files with your package.json

## Usage

```js
var sync = require('sync-cordova-xml')

sync(require('./package.json'), xmlString, 'plugin')

```

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
