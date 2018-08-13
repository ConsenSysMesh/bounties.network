/*

bounties.network

*/

let video
let videoParent

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
 */
function carousel(opts) {
  let {parentSelector, itemSelector, prevSelector, nextSelector} = opts
  let carouselParent = el(parentSelector)
  let items = all(`${parentSelector} ${itemSelector}`)
  let prev = el(prevSelector)
  let next = el(nextSelector)
  let cursor = 0
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
    nextSelector: 'partnerships-organizations-next'
  })

  carousel({
    parentSelector: '#partnerships-media-carousel',
    itemSelector: '.carousel-item',
    prevSelector: '#partnerships-media-prev',
    nextSelector: 'partnerships-media-next'
  })
}

// window resize event
function window_resize() {
  let width = videoParent.offsetWidth
  video.setAttribute('width', width)
  video.setAttribute('height', width / 560 * 315)
}

window.addEventListener('load', window_load)
window.addEventListener('resize', window_resize)
