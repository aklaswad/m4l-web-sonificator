var browser = this.patcher.getnamed('thebrowser')
function bang () {
  //browser.rect = [ 0, 30, this.patcher.wind.size[0], 100 ]
  if ( !browser ) {
    browser = this.patcher.getnamed('thebrowser')
  }
  if ( !browser ) {
    if ( Math.random() < 0.01 ) {
      post('(sonificator: browser resize) no browser...')
    }
    return
  }
   browser.setattr(
    'presentation_rect',
    0,
    28,
    this.patcher.wind.size[0],
    this.patcher.wind.size[1] - 28
  )
}
post('resize v2')