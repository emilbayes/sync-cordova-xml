#! /usr/bin/env node
var fs = require('fs')
var sync = require('..')
var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['plugin'],
  string: ['output'],
  alias: {
    'o': 'output'
  }
})

var i = 2
var mode = 'config'

if (argv._[1].endsWith('plugin.xml')) mode = 'plugin'
if (argv._[1].endsWith('config.xml')) mode = 'config'
if (argv.plugin === true) mode = 'plugin'
if (argv.config === true) mode = 'config'

try {
  var pkg = JSON.parse(fs.readFileSync(argv._[0]).toString())
} catch (e) {
  console.error(e)
  process.exit(1)
}

try {
  var xml = fs.readFileSync(argv._[1]).toString()
} catch (e) {
  console.error(e)
  process.exit(2)
}

var out = process.stdout
if (argv.output) out = fs.createWriteStream(argv.output)
out.write(sync(pkg, xml, mode))
out.write('\n')
