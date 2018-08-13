/*

./src/data

This gets pulled into ejs for use in ./src/index.ejs

*/

let {NODE_ENV} = process.env
let dev = NODE_ENV === 'development'
let prd = NODE_ENV === 'production'

// partner list
let partners = require('./partners')

// media, articles, videos
let media = require('./media')

let opts = {
  dev,
  prd,
  partners,
  media
}

module.exports = opts
