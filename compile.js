// I can't find out a good way to compile multi line source into
// single Max message, so using js to do it.

var inlets = 1
var outlets = 1

function bang () {
  var filepath = this.patcher.filepath.replace(/gui\.maxpat$/,'') + 'sonificator.txt'
  //var f = new File(filepath)
  var f = new File('./sonificator.txt')
  var s = f.readstring(65535)
  outlet(0, ['executejavascript', s])
  f.close()
}


