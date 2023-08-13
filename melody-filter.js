var inlets = 1
var outlets = 1

var currentMode = 'exclude'
var targetElements = {}

function mode(m) {
  currentMode = m
  post('m: ',currentMode)
}

function set () {
  targetElements = {}
  for ( var i=0; i<arguments.length; i++) {
    targetElements[arguments[i].toLowerCase()] = 1
  }
}

function node (nodeName) {
  if (targetElements[nodeName.toLowerCase()]) {
    // Ignore it
    if ( currentMode === 'include' ) {
        outlet(0, 'bang')      
    }
  }
  else {
    if ( currentMode !== 'include' ) {
        outlet(0, 'bang')      
    }
  }
}