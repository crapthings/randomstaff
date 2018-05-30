const fs = require('fs')
const _ = require('lodash')
const async = require('async')
const osmosis = require('osmosis')
const shortid = require('shortid')
const shell = require('shelljs')

const filelist = fs.readdirSync('./faxinlist')

shortid.generate()

async.eachSeries(filelist, (item, filelistCallback) => {
  const json = JSON.parse(fs.readFileSync('./faxinidx/' + item, { encoding: 'utf-8' }))
  async.eachSeries(json, (page, pageCallback) => {
    const cmd = `curl -s -X GET -b "Hm_lvt_a317640b4aeca83b20c90d410335b70f=1527393079%2C1527578676&ASP.NET_SessionId=dbkrc32bugc0m54p21lvex1v&sid=dbkrc32bugc0m54p21lvex1v&CookieKey_AreaId=008&CookieKey_AreaName=%25E9%25BB%2591%25E9%25BE%2599%25E6%25B1%259F%25E7%259C%2581&username=hljlx3059&userpwd=hljlx3059&isAutoLogin=on&lawapp_web=568E4844FEBC9FF0F9F2F84648889BDFCC01280ADF0A4CBBB39A926A8F30602A1F91EF69926953D9CEE7EA2CD7B72828674F476B6CE51FCD509BF3B388C4CDDBA306A02C8ADCC248BC8D53A273EAE05CFF6FB30CF19B3983C2E4F1E711753F4B2BA6556BB6618F2B074377C08B852D55ABB884ED5AA397661A3C550205AC3B08B49E52A6&Hm_lpvt_a317640b4aeca83b20c90d410335b70f=1527644759" -H "Host: faxin.cn" -H "Connection: keep-alive" -H "Pragma: no-cache" -H "Cache-Control: no-cache" -H "Upgrade-Insecure-Requests: 1" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8" -H "Referer: http://faxin.cn/lib/cpws/CpwsSearchList.aspx?year_id=2017" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7" -H "Cookie: Hm_lvt_a317640b4aeca83b20c90d410335b70f=1527393079,1527578676; ASP.NET_SessionId=dbkrc32bugc0m54p21lvex1v; sid=dbkrc32bugc0m54p21lvex1v; CookieKey_AreaId=008; CookieKey_AreaName=%E9%BB%91%E9%BE%99%E6%B1%9F%E7%9C%81; username=hljlx3059; userpwd=hljlx3059; isAutoLogin=on; lawapp_web=568E4844FEBC9FF0F9F2F84648889BDFCC01280ADF0A4CBBB39A926A8F30602A1F91EF69926953D9CEE7EA2CD7B72828674F476B6CE51FCD509BF3B388C4CDDBA306A02C8ADCC248BC8D53A273EAE05CFF6FB30CF19B3983C2E4F1E711753F4B2BA6556BB6618F2B074377C08B852D55ABB884ED5AA397661A3C550205AC3B08B49E52A6; Hm_lpvt_a317640b4aeca83b20c90d410335b70f=1527644759" http://faxin.cn/lib/cpws/${page.url} | gunzip > ./html/${shortid.generate()}.html`
    shell.exec(cmd)
    setTimeout(() => {
      console.log('get page', page.title)
      pageCallback()
    }, 500)
  }, err => {
    filelistCallback()
  })

}, err => {
  console.log('done')
})