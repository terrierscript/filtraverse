var intersect = require("intersect")
var traverse = require("traverse")
var filter = function(obj, extractKeys){
  var wrap = {
    item : obj
  }

  traverse(wrap).forEach(function(){
    if(typeof this.node !== "object") return
    if(this.isRoot) return
    var objectKeys = Object.keys(this.node)
    var keys = intersect(extractKeys, objectKeys)
    if(keys.length < extractKeys.length) return // TODO
    var newObj = {}
    var node = this.node
    keys.forEach(function(k){
      newObj[k] = node[k]
    })
    //return newObj // for map
    this.update(newObj)
  })
  return wrap.item
}
