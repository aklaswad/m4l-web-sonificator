
(function () {
  var MAX_RESTS = 16;
  var rests = 0;
  var glitchRatio = 0.0

  var style_rules = [
    '.soni-background0 { -webkit-transition: all 5.5s; background-color: #030303 !important; }',
    '.soni-background1 { -webkit-transition: all 5.5s; background-color: #080010 !important; }',
    '.soni-background2 { -webkit-transition: all 5.5s; background-color: #001008 !important; }',
    '.soni-background3 { -webkit-transition: all 5.5s; background-color: #100800 !important; }',
    '.soni-no-bg, a.soni-no-bg { border-color: rgba(32,32,32,0.2) !important; color: #222 !important; background-color: rgba(0,0,0,0.0) !important;}',
    '.soni-has-bg { border-color: rgba(32,32,32,0.2) !important; opacity: 0.2 !important; }',
    '.soni-no-bg.soni-highlight { color: rgba(255,255,255,0.9) !important; background-color: rgba(255,255,255, 0.4) !important; z-index: 100000;}',
    '.soni-has-bg.soni-highlight { opacity: 0.8 !important; }',
    '.soni-no-bg.soni-highlight.soni-highlight-active { filter: drop-shadow(0px 0px 40px #fff); }',
    '.soni-has-bg.soni-highlight.soni-highlight-active { filter: drop-shadow(0px 0px 40px #fff); }',


    '.soni-no-bg.soni-highlight.soni-highlight-fadeout { -webkit-transition: all 1.5s; color: #222 !important; background-color: rgba(0,0,0,0.0) !important;}',
    '.soni-has-bg.soni-highlight.soni-highlight-fadeout { -webkit-transition: all 1.5s; opacity: 0.2 !important; }',

    '.soni-glitch.soni-glitch1.soni-no-bg.soni-highlight { transform: translateX(5vw) translateY(5vw);  color: rgba(255,245,255,0.7) !important; background-color: rgba(0,0,0, 0.0) !important; width: 50vw  !important; height: 20vh  !important; font-size: 1.1em !important; z-index: 100000;}',
    '.soni-glitch.soni-glitch2.soni-no-bg.soni-highlight { transform: translateX(-5vw) translateY(5vw);  color: rgba(245,255,255,0.7) !important; background-color: rgba(255,255,255, 0.2) !important; width: 20vw  !important; height: 50vh  !important; font-size: 1.3em !important; z-index: 100000;}',
    '.soni-glitch.soni-glitch3.soni-no-bg.soni-highlight { transform: translateX(5vw) translateY(-5vw);  color: rgba(155,155,145,0.4) !important; background-color: rgba(255,255,255, 0.2) !important; width: 80vw  !important; height: 50vh  !important; font-size: 1.5em !important; z-index: 100000;}',
    '.soni-glitch.soni-glitch4.soni-no-bg.soni-highlight { transform: translateX(-5vw) translateY(-5vw);  color: rgba(0,0,0,1.0) !important; background-color: rgba(0,0,0,0.0) !important; width: 50vw  !important; height: 80vh  !important; font-size: 1.7em !important; z-index: 100000;}',
    '.soni-glitch.soni-has-bg.soni-highlight { opacity: 0.8 !important; width: 100vmax !important; height: 100vmax !important; font-size: 3em !important;}',
    '.soni-glitch.soni-no-bg.soni-highlight.soni-highlight-fadeout { -webkit-transition: all 2.5s; transform: translateX(0px) translateY(0px); width: 0px; height: 0px; color: rgba(0,0,0,0.2) !important; background-color: rgba(0,0,0,0.0) !important; width: auto !important; height: auto !important; z-index: 0; font-size: 1rem !important;}',
    '.soni-glitch.soni-has-bg.soni-highlight.soni-highlight-fadeout { -webkit-transition: all 2.5s; opacity: 0.2 !important; width: auto  !important; height: auto  !important; font-size: 1rem !important; }'
  ];

  var stylesheet;
  function installStylesheet() {
    if (!stylesheet) {
      var styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      styleElement.setAttribute('id', 'soniStyle');
      document.getElementsByTagName('head')[0].appendChild(styleElement);
      stylesheet = styleElement.sheet;
      document.querySelectorAll('body *').forEach(function (elem) {
        if (window.getComputedStyle(elem).backgroundImage === 'none'
          && !(elem.tagName === 'svg' || elem.tagName === 'IMG' || elem.tagName === 'IFRAME')) {
          elem.classList.add('soni-no-bg')
        }
        else {
          elem.classList.add('soni-has-bg')
        }
      });
    }
    for (var rule_idx = 0; rule_idx < style_rules.length; rule_idx++) {
      var rule = style_rules[rule_idx];
      stylesheet.insertRule(rule, 0);
    }
    if (Math.random() < 0.3) {
      window.devicePixelRatio = 0.9 + Math.random() * 2.0
    }

  }

  function uninstallStylesheet() {
    while (stylesheet.cssRules.length) {
      stylesheet.deleteRule(0);
    }
  }
  setTimeout(installStylesheet, 1000)

  let windowWidth = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth
  })

  const body = document.querySelector('body')
  body.classList.add('soni-background0')

  let highLightBuffer = []
  let working = false
  let useVisualizer = true

  function setVisualizer (enable) {
    if (enable) {
      installStylesheet()
      useVisualizer = true
    }
    else {
      uninstallStylesheet()
      useVisualizer = false
    }
  }

  function visualize (ctx) {
    const elem = ctx.current
    if ( !elem ) {
      return
    }
    if (elem.nodeType === 1) {
      if (elem.nodeName === 'H1' || elem.nodeName === 'H2') {
        body.classList.remove('soni-background0', 'soni-background1', 'soni-background2', 'soni-background3')
        body.classList.add('soni-background' + (Math.floor(Math.random() * 4)))
      }
      if (ctx.currentVisibility) {
        elem.scrollIntoView({ behavior: Math.random() < 0.8 ? 'instant' : 'smooth', block: 'center', inline: 'center' })
        elem.classList.remove('soni-highlight-fadeout')
        if (Math.random() < (1.0 - glitchRatio)) {
          elem.classList.add('soni-highlight', 'soni-highlight-active')
        }
        else {
          elem.classList.add('soni-highlight', 'soni-glitch', 'soni-highlight-active',
            Math.random() < 0.3 ? 'soni-glitch1'
              : Math.random() < 0.3 ? 'soni-glitch2'
                : Math.random() < 0.3 ? 'soni-glitch3'
                  : 'soni-glitch4')
        }
        if ( highLightBuffer.length ) {
          const prev = highLightBuffer[highLightBuffer.length - 1][1]
          if (prev) {
            prev.classList.remove('soni-highlight-active')
            prev.classList.add('soni-highlight-fadeout')
          }
        }

        const now = new Date().getTime()
        const threeSecondsAgo = now - 3000
        const nextBuffer = []

        // TODO: performance fix
        highLightBuffer.forEach(item => {
          if (item[0] < threeSecondsAgo) {
            item[1].classList.remove('soni-highlight', 'soni-glitch', 'soni-glitch1', 'soni-glitch2', 'soni-glitch3', 'soni-glitch4')
          }
          else {
            nextBuffer.push(item)
          }
        })

        nextBuffer.push([now, elem])
        highLightBuffer = nextBuffer
      }
    }
  }

  const ctx = {}
  function initContext() {
    ctx.iterator = document.createTreeWalker(
      body,
      NodeFilter.SHOW_ALL,
      (node) => {
        if ( node.nodeName === 'SELECT' ) return NodeFilter.FILTER_REJECT
        //if ( node.nodeName === '#text' && !node.previousSibling && !node.nextSibling ) return NodeFilter.FILTER_SKIP
        return NodeFilter.FILTER_ACCEPT
      }
    )
    ctx.current = body
    ctx.currentVisibility = true
    ctx.parents = []
    ctx.step = 0
    ctx.end = false
    nextNode(ctx)
  }
  initContext()

  function nextNode(ctx, steps=1) {
    let n=0
    while (n++ <= steps) {
      if ( ! ctx.iterator.nextNode() ) {
        ctx.end = true
        setTimeout(() => {
          initContext()
        }, 1000)
        return
      }
    }
    ctx.current = ctx.iterator.currentNode
  }

  function prevNode(ctx, steps=1) {
    let n = 0
    while (n++ <= steps ) {
      if ( ! ctx.iterator.previousNode() ) {
        ctx.current = ctx.iterator.currentNode
        return
      }
    }
    ctx.current = ctx.iterator.currentNode
  }

  function getDepth (node) {
    return node.nodeName.toLowerCase() === 'body' ? 0 : getDepth(node.parentNode) + 1
  }

  function getPreviousLength (node) {
    return node.previousSibling ? getPreviousLength(node.previousSibling) + 1 : 0
  }

  function getNextLength (node) {
    return node.nextSibling ? getNextLength(node.nextSibling) + 1 : 0
  }

  function findNextNode () {
    if (working) {
      window.max.outlet('busy')
      return
    }
    working = true

    let style
    let maxLoop = 1000
    try {
      nextNode(ctx)
    }
    catch (e) {
      window.max.outlet('warn', e)
    }

    const prevCount = getPreviousLength(ctx.current)
    const nextCount = getNextLength(ctx.current)
    const thisDepth = getDepth(ctx.current)

    let rect = { width: 0, height: 0 }

    if (ctx.current.nodeType === 1) {
      rect = ctx.current.getBoundingClientRect()
    }
    ctx.nextOut = [
      ctx.currentVisibility,
      ctx.current.nodeName,
      Math.max(rect.width, ctx.current.scrollWidth),
      Math.max(rect.height, ctx.current.scrollHeight),
      windowWidth,
      ctx.current.nodeType,
      thisDepth,
      prevCount,
      nextCount,
    ]
    working = false
  }

  window.max.bindInlet('getnote', function () {
    if ( ctx.end ) {
      window.max.outlet('contentend')
    }
    if ( ctx.nextOut ) {
       window.max.outlet('node', ...ctx.nextOut)
    }
    if ( useVisualizer ) {
      visualize(ctx)
    }
    setTimeout(findNextNode, 1)
  })

  window.max.bindInlet('set', function (key, value) {
    switch (key) {
      case 'visual':
        setVisualizer(value)
        break
      case 'visual.glitch':
        glitchRatio = value
        break
      default:
        window.max.outlet('warn', 'unknown key for set: ' + key + ':' + value)
    }
  })

  window.max.bindInlet('next', function (steps) {
    nextNode(ctx, steps)
  })

  window.max.bindInlet('prev', function (steps) {
    prevNode(ctx, steps)
  })
})()

window.max.outlet('loaded')

