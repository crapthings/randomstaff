const fs = require('fs-plus')
const path = require('path')
const _ = require('lodash')
const jsonfile = require('jsonfile')

const list = fs.readdirSync('./processed')

let cats = []

for (let file of list) {
  const data = JSON.parse(fs.readFileSync('./processed/' + file, { encoding: 'utf-8' }))
  const cat = _.last(data.meta).replace(/^门类：/, '')
  cats.push(cat)
}

cats = _.uniq(cats)

for (let cat of cats) {
  fs.makeTreeSync('./cats/' + cat)
}

for (let file of list) {
  const data = JSON.parse(fs.readFileSync('./processed/' + file, { encoding: 'utf-8' }))
  const cat = _.last(data.meta).replace(/^门类：/, '')
  fs.moveSync('./processed/' + file, './cats/' + cat + '/' + file)
  console.log(file)
}
