/*

# prettier config

automatically format all the js

## about

https://prettier.io/docs/en/index.html

## documentation

https://prettier.io/docs/en/configuration.html

*/

let opts = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: "none",
  bracketSpacing: false,
  arrowParens: "avoid",
  proseWrap: "never"
}

module.exports = opts
