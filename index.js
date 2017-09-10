var xml = require('xmldom')
var assert = require('nanoassert')
module.exports = function (jsonObj, xmlStr, mode) {
  assert(jsonObj != null)
  assert(typeof xmlStr === 'string')

  var xmlDoc = new xml.DOMParser().parseFromString(xmlStr, 'text/xml')

  if (jsonObj.version) xmlDoc.documentElement.setAttribute('version', jsonObj.version)
  if (jsonObj.name) {
    if (mode === 'plugin') xmlDoc.documentElement.setAttribute('id', jsonObj.name)
    upsertNode(xmlDoc.documentElement, 'name', {}, jsonObj.name)
  }
  if (jsonObj.description) {
    upsertNode(xmlDoc.documentElement, 'description', {}, jsonObj.description)
  }

  return new xml.XMLSerializer().serializeToString(xmlDoc)

  function upsertNode(parent, name, attrs, content) {
    var nodes = parent.getElementsByTagName(name)
    var node = nodes.length > 0 ? nodes[0] : xmlDoc.createElement(name)

    Object.keys(attrs).forEach(function (key) {
      node.setAttribute(key, attrs[key])
    })

    for (var i = 0; i < node.childNodes.length; i++) {
      node.removeChild(node.childNodes.item(i))
    }

    if (typeof content === 'string') node.appendChild(xmlDoc.createTextNode(content))

    if (nodes.length === 0) parent.appendChild(node)
  }
}
