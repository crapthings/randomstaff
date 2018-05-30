const fs = require('fs')
const _ = require('lodash')
const async = require('async')
const osmosis = require('osmosis')
const jsonfile = require('jsonfile')

const file = './datasetwithtotal.json'

const dataset = JSON.parse(fs.readFileSync('./dataset.json', { encoding: 'utf-8' }))

const successlist = []
const failedlist = []

const run = async () => {
  let length = dataset.length
  const _dataset = []

  async.eachSeries(dataset, (item, callback) => {
    const data = item
    const total = osmosis
      .get('http://search.chinalaw.gov.cn/' + data.url)
      .find('#pagecount')
      .set('total')
      .data(({ total }) => {
        total = parseInt(total)
        data.total = total
        _dataset.push(data)
        console.log(data.title, total, length, _dataset.length)
        length -= 1
        setTimeout(() => { callback() }, 500)
      })
      .error(err => {
        data.total = 1
        _dataset.push(data)
        console.log(err, data.title, total, length, _dataset.length)
        length -= 1
        setTimeout(() => { callback() }, 500)
      })
  }, err => {
    console.log(err)
    jsonfile.writeFile(file, _dataset, { spaces: 2 }, err => {
      console.log('done')
    })
  })
}

run()
