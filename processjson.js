const fs = require('fs-plus')
const path = require('path')
const _ = require('lodash')
const jsonfile = require('jsonfile')

const list = fs.readdirSync('./database')

for (let file of list) {
  const json = JSON.parse(fs.readFileSync('./database/' + file, { encoding: 'utf-8' }))
  const data = {}
  data.title = json.title
  data.meta = _.reject(json.meta.split(/\s/), _.isEmpty)
  data.content = _.reject(json.content.join().split(/\s/), _.isEmpty)
  fs.writeFileSync('./processed/' + file, JSON.stringify(data, null, 2))
}
