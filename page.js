const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const async = require('async')
const osmosis = require('osmosis')
const jsonfile = require('jsonfile')

const dataset = JSON.parse(fs.readFileSync('./datasetwithtotal.json', { encoding: 'utf-8' }))

const run = async () => {
  const filepath = path.resolve(__dirname, 'database')
  async.eachSeries(dataset, (item, callback) => {
    const urls = _.times(item.total, n => 'http://search.chinalaw.gov.cn/' + item.url + '&PageIndex=' + parseInt(n + 1))
    const data = { content: [] }
    async.eachSeries(urls, (url, fetchcb) => {
      console.log('fetching', url)
      osmosis
        .get(url)
        .find('.detailCon')
        .set({
          title: '.conTit',
          meta: '.d_infor',
          text: '.con'
        })
        .data(({ title, meta, text }) => {
          data.title = title
          data.meta = meta
          data.content.push(text)
          setTimeout(() => { fetchcb() }, 500)
        })
    }, err => {
      jsonfile.writeFile(path.resolve(filepath, `${data.title}.txt`), data, { spaces: 2 }, err => {
        err && console.log(err)
        console.log(data.title, 'done')
        callback()
      })
    })
  }, err => {
    console.log('done')
  })
}

run()
