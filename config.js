let {NODE_ENV} = process.env
let dev = NODE_ENV === 'development'
let prd = NODE_ENV === 'production'

let opts = {
  prd
}

module.exports = opts
