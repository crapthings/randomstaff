const _ = require('lodash')
const async = require('async')
const osmosis = require('osmosis')
const jsonfile = require('jsonfile')

const buildUrl = ({ keyword, page = 1 }) => `http://search.chinalaw.gov.cn/SearchLawTitle?effectLevel=0&SiteID=124&PageIndex=${page}&Query=${encodeURI(keyword)}&Type=1`

const url = buildUrl({ keyword: '中华人民共和国' })

const file = './dataset.json'

osmosis
  .get(url)
  .find('#pagecount')
  .set('total')
  .data(({ total }) => {
    total = parseInt(total)
    const urls = []
    for (let page = 1; page <= total; page += 1) {
      urls.push(cb => {
        setTimeout(() => {
          console.log('fetching', page)
          osmosis
            .get(buildUrl({ keyword: '中华人民共和国', page }))
            .set([osmosis.find('.listLef h3').set({
              title: 'a',
              url: 'a@href'
            })])
            .data(set => {
              set = _.filter(set, ({ title }) => title.match(/^中华人民共和国/))
              console.log(set)
              cb(null, set)
            })
        }, 500)
      })
    }

    async.series(urls, (err, result) => {
      err && console.log(err)
      result = _.flattenDeep(result)
      jsonfile.writeFile(file, result, { spaces: 2 }, err => {
        err && console.log(err)
        console.log('done')
      })
    })
  })
