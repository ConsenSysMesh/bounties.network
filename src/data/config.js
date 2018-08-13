let {NODE_ENV} = process.env
let dev = NODE_ENV === 'development'
let prd = NODE_ENV === 'production'

let partners = [
  {
    title: 'CONSENSYS',
    imageUrl: '/img/partnerships/consensys.png',
    websiteUrl: 'https://new.consensys.net'
  },
  {
    title: 'GITCOIN',
    imageUrl: '/img/partnerships/gitcoin.png',
    websiteUrl: 'https://gitcoin.co'
  },
  {
    title: 'status',
    imageUrl: '/img/partnerships/status.svg',
    websiteUrl: 'https://status.im'
  },
  {
    title: 'CELLARIUS',
    imageUrl: '/img/partnerships/cellarius.png',
    websiteUrl: 'https://cellarius.network'
  },
  {
    title: 'CONSENSYS',
    imageUrl: '/img/partnerships/consensys.png',
    websiteUrl: 'https://new.consensys.net'
  },
  {
    title: 'GITCOIN',
    imageUrl: '/img/partnerships/gitcoin.png',
    websiteUrl: 'https://gitcoin.co'
  },
  {
    title: 'status',
    imageUrl: '/img/partnerships/status.svg',
    websiteUrl: 'https://status.im'
  },
  {
    title: 'CELLARIUS',
    imageUrl: '/img/partnerships/cellarius.png',
    websiteUrl: 'https://cellarius.network'
  }
]

let opts = {
  dev,
  prd
}

module.exports = opts
