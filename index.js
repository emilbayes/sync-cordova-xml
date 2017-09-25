var xml = require('xmldom')
var assert = require('nanoassert')
var parseAuthor = require('parse-author')
module.exports = function (jsonObj, xmlStr, mode) {
  assert(jsonObj != null)
  assert(typeof xmlStr === 'string')

  var xmlDoc = new xml.DOMParser().parseFromString(xmlStr, 'text/xml')

  if (jsonObj.version) xmlDoc.documentElement.setAttribute('version', jsonObj.version)

  if (jsonObj.name) {
    if (mode === 'plugin') xmlDoc.documentElement.setAttribute('id', trimScope(jsonObj.name))
    upsertNode(xmlDoc.documentElement, 'name', {}, jsonObj.name)
  }

  // displayName is a cordova convention
  if (jsonObj.displayName && mode === 'config') {
    upsertNode(xmlDoc.documentElement, 'name', {}, jsonObj.displayName)
  }

  if (jsonObj.description) {
    upsertNode(xmlDoc.documentElement, 'description', {}, jsonObj.description)
  }

  if (mode === 'plugin') {
    if (jsonObj.license) upsertNode(xmlDoc.documentElement, 'license', {}, jsonObj.license)
    if (Array.isArray(jsonObj.keywords)) upsertNode(xmlDoc.documentElement, 'keywords', {}, jsonObj.keywords.join())

    if (jsonObj.repository) {
      if (typeof jsonObj.repository === 'string') upsertNode(xmlDoc.documentElement, 'repo', {}, jsonObj.repository)
      if (jsonObj.repository.url) upsertNode(xmlDoc.documentElement, 'repo', {}, jsonObj.repository.url)
    }

    if (jsonObj.bugs) {
      if (jsonObj.bugs.url) upsertNode(xmlDoc.documentElement, 'issue', {}, jsonObj.bugs.url)
    }

    if (jsonObj.author) {
      if (typeof jsonObj.author === 'string') jsonObj.author = parseAuthor(jsonObj.author)
      upsertNode(xmlDoc.documentElement, 'author', {
        email: jsonObj.author.email,
        href: jsonObj.author.url
      }, jsonObj.author.name)
    }
  }

  return new xml.XMLSerializer().serializeToString(xmlDoc)

  function upsertNode(parent, name, attrs, content) {
    var nodes = parent.getElementsByTagName(name)
    var node = nodes.length > 0 ? nodes[0] : xmlDoc.createElement(name)

    Object.keys(attrs).forEach(function (key) {
      if (attrs[key] == null) return
      node.setAttribute(key, attrs[key])
    })

    for (var i = 0; i < node.childNodes.length; i++) {
      node.removeChild(node.childNodes.item(i))
    }

    if (typeof content === 'string') node.appendChild(xmlDoc.createTextNode(content))

    if (nodes.length === 0) {
      var ws = xmlDoc.createTextNode(parent.firstChild.data) // get indentation
      var nl = xmlDoc.createTextNode('\n') // Create trailing new line
      parent.replaceChild(ws, parent.lastChild) // Replace existing new line (last child)
      parent.appendChild(node) // actually append node
      parent.appendChild(nl) // Insert new line again
    }
  }
}


function trimScope (str) {
  return str.replace(/^@[^/]+\//, '')
}
