var inlets = 1
var outlets = 1

var map = {}
var reverse_map = {}

function set () {    
    post('got', arguments)
    // 36 : C1 of midi note
    var nn = 36 + arguments[0]

    // Clear existing entries
    var current = map[nn] || []
    for ( var i=0; i<current.length; i++ ) {
      var node = current[i]
      var rev = reverse_map[node] || {}
      delete rev[nn]
    }
    var nodes = []
    post('\n', nn)
    for ( var i=1; i<arguments.length; i++) {
      var node = arguments[i].toLowerCase()
      nodes.push(node)
      if ( ! reverse_map[node] ) {
        reverse_map[node] = {}
      }
      reverse_map[node][nn] = 1
      post('\n',arguments[i])
    }
    post('\n', nodes)
    map[nn] = nodes
}

function node (nodeName) {
  var map = reverse_map[nodeName.toLowerCase()]
  if (map) {
    var keys = Object.keys(map)
    for ( var i=0; i<keys.length; i++) {
      outlet(0, Math.floor(keys[i]))
    }
  }
}