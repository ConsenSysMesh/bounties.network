/*

bounties.network

*/

let video
let videoParent
let longPause = 3000
let shortPause = 1000

/**
 * Get one element by it's selector
 * @method el
 * @param {string} selector
 * @returns {object}
 */
let el = selector => document.querySelector(selector)

/**
 * Get all elements by their selector
 * @method all
 * @param {string} selector
 * @returns {array}
 */
let all = selector => Array.from(document.querySelectorAll(selector))

/**
 * Create a carousel
 * @method carousel
 * @param {object} opts
 * @param {string} opts.parentSelector
 * @param {string} opts.itemSelector
 * @param {string} opts.prevSelector
 * @param {string} opts.nextSelector
 */
function carousel(opts) {
  let {parentSelector, itemSelector, prevSelector, nextSelector} = opts
  let parent = el(parentSelector)
  let items = all(`${parentSelector} ${itemSelector}`)
  let prev = el(prevSelector)
  let next = el(nextSelector)
  let cursorMin = 0
  let cursorMax = items.length - 1
  let cursor = cursorMin
  let rotateTimer
  let moveTimer

  // scroll the parent to y-coordinate position
  function scrollTo(position) {
    let moveWait = 0

    // while scrolling disable the scrollbar
    parent.classList.add('hide-scrollbars')

    // stop existing animation
    clearTimeout(moveTimer)

    function scrollDone() {
      parent.classList.remove('hide-scrollbars')
    }

    function scrollToMover() {
      let delta = parent.scrollLeft - position
      let deltaAbs = Math.abs(delta)

      if (deltaAbs <= 1) {
        return scrollDone()
      }

      let movePct = deltaAbs * 0.06

      if (movePct < 1) {
        movePct = 1
      }

      let movePx = delta > 0 ? movePct : -movePct
      let scrollPos = Math.floor(parent.scrollLeft - movePx)
      moveWait += 0.3
      parent.scroll(scrollPos, 0)
      moveTimer = setTimeout(scrollToMover, moveWait)
    }

    scrollToMover()
  }

  function clearRotateTimer() {
    clearTimeout(rotateTimer)
  }

  function rotate(opts = {}) {
    let {direction = 'next'} = opts

    if (cursor < cursorMin && direction === 'prev') {
      cursor = cursorMax
    }

    if (cursor < cursorMin) {
      cursor = cursorMax
    }

    if (cursor > cursorMax) {
      cursor = cursorMin
    }

    let item = items[cursor]
    let rightDelta = parent.offsetWidth - parent.scrollLeft
    let position = item.offsetLeft - parent.offsetLeft

    if (rightDelta < 0 && direction === 'next' && cursor !== cursorMin) {
      position = position + rightDelta
      cursor = cursorMax
    }

    scrollTo(position)

    return {rightDelta, position}
  }

  function rotateNext() {
    clearRotateTimer()
    cursor += 1
    rotate()
    rotateTimer = setTimeout(rotateNext, shortPause)
  }

  function delayRotateNext() {
    clearRotateTimer()
    rotateTimer = setTimeout(rotateNext, longPause)
  }

  function moveNext() {
    delayRotateNext()
    cursor += 1
    rotate({direction: 'next'})
  }

  function movePrev() {
    delayRotateNext()
    cursor -= 1
    let {rightDelta, position} = rotate({direction: 'prev'})
    if (rightDelta < 0) {
      parent.scroll(position, 0)
      movePrev()
    }
  }

  parent.addEventListener('mousemove', delayRotateNext)
  parent.addEventListener('scroll', delayRotateNext)

  items.forEach(item => {
    item.addEventListener('mousemove', delayRotateNext)
  })

  prev.addEventListener('click', movePrev)
  next.addEventListener('click', moveNext)

  rotateTimer = setTimeout(rotateNext, longPause)
}

// window load event
function window_load() {
  video = el('iframe#benefits-video-inner')
  videoParent = el('div#benefits-video-outer')
  window_resize()

  carousel({
    parentSelector: '#partnerships-organizations-carousel',
    itemSelector: '.carousel-item',
    prevSelector: '#partnerships-organizations-prev',
    nextSelector: '#partnerships-organizations-next'
  })

  carousel({
    parentSelector: '#partnerships-media-carousel',
    itemSelector: '.carousel-item',
    prevSelector: '#partnerships-media-prev',
    nextSelector: '#partnerships-media-next'
  })
}

// window resize event
function window_resize() {
  if (videoParent === null) {
    return
  }
  let width = videoParent.offsetWidth
  video.setAttribute('width', width)
  video.setAttribute('height', width / 560 * 315)
}

window.addEventListener('load', window_load)
window.addEventListener('resize', window_resize)
