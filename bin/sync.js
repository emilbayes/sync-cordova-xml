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
var mode = argv.plugin === true ? 'plugin' : 'config'

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
out.write(sync(pkg, xml, 'plugin'))
out.write('\n')
