var inlets = 1
var outlets = 1

var buf = []
var str

function msg_int (i) {
  var c = String.fromCharCode(i)
  buf.push(c)
  //outlet(0, ['got', c, i])
}

function bang () {
  outlet(0, ['executejavascript', buf.join('')])// ['executejavascript', str])
  buf = []

}