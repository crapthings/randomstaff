// const fs = require('fs-plus')
// const path = require('path')
// const _ = require('lodash')
// const jsonfile = require('jsonfile')
//
// const list = fs.readdirSync('./processed')
//
// let cats = []
//
// for (let file of list) {
//   const data = JSON.parse(fs.readFileSync('./processed/' + file, { encoding: 'utf-8' }))
//   const cat = _.last(data.meta).replace(/^门类：/, '')
//   cats.push(cat)
// }
//
// cats = _.uniq(cats)
//
// for (let cat of cats) {
//   fs.makeTreeSync('./cats/' + cat)
// }
//
// for (let file of list) {
//   const data = JSON.parse(fs.readFileSync('./processed/' + file, { encoding: 'utf-8' }))
//   const cat = _.last(data.meta).replace(/^门类：/, '')
//   const validIdx = data.meta.length - 2
//   let valid = data.meta[validIdx].replace(/^效力：/, '')
//   if (valid === '已修改')
//     valid = '有效'
//   fs.moveSync('./processed/' + file, `./${valid}/` + file)
//   console.log(file)
// }
