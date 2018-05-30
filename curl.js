const fs = require('fs')
const _ = require('lodash')
const async = require('async')
const shell = require('shelljs')
const osmosis = require('osmosis')

let idx = 1

const cmd = ({ page = 1 }) => `curl -s -X POST -b "Hm_lvt_a317640b4aeca83b20c90d410335b70f=1527393079%2C1527578676&ASP.NET_SessionId=dbkrc32bugc0m54p21lvex1v&sid=dbkrc32bugc0m54p21lvex1v&CookieKey_AreaId=008&CookieKey_AreaName=%25E9%25BB%2591%25E9%25BE%2599%25E6%25B1%259F%25E7%259C%2581&username=hljlx3059&userpwd=hljlx3059&isAutoLogin=on&lawapp_web=568E4844FEBC9FF0F9F2F84648889BDFCC01280ADF0A4CBBB39A926A8F30602A1F91EF69926953D9CEE7EA2CD7B72828674F476B6CE51FCD509BF3B388C4CDDBA306A02C8ADCC248BC8D53A273EAE05CFF6FB30CF19B3983C2E4F1E711753F4B2BA6556BB6618F2B074377C08B852D55ABB884ED5AA397661A3C550205AC3B08B49E52A6&Hm_lpvt_a317640b4aeca83b20c90d410335b70f=1527643863" -H "Pragma: no-cache" -H "Origin: http://faxin.cn" -H "Accept-Encoding: gzip, deflate" -H "Host: faxin.cn" -H "Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Cache-Control: no-cache" -H "X-Requested-With: XMLHttpRequest" -H "Cookie: Hm_lvt_a317640b4aeca83b20c90d410335b70f=1527393079,1527578676; ASP.NET_SessionId=dbkrc32bugc0m54p21lvex1v; sid=dbkrc32bugc0m54p21lvex1v; CookieKey_AreaId=008; CookieKey_AreaName=%E9%BB%91%E9%BE%99%E6%B1%9F%E7%9C%81; username=hljlx3059; userpwd=hljlx3059; isAutoLogin=on; lawapp_web=568E4844FEBC9FF0F9F2F84648889BDFCC01280ADF0A4CBBB39A926A8F30602A1F91EF69926953D9CEE7EA2CD7B72828674F476B6CE51FCD509BF3B388C4CDDBA306A02C8ADCC248BC8D53A273EAE05CFF6FB30CF19B3983C2E4F1E711753F4B2BA6556BB6618F2B074377C08B852D55ABB884ED5AA397661A3C550205AC3B08B49E52A6; Hm_lpvt_a317640b4aeca83b20c90d410335b70f=1527643863" -H "Connection: keep-alive" -H "Referer: http://faxin.cn/lib/cpws/CpwsSearchList.aspx?year_id=2017" -H "Content-Length: 325" -d "year_id=2017&firstPage=${page}&listnum=50&sort_field=RELEVANCE&ts=1&sort_id_left=&fyjb_id_left=&fcourt_id_left=&year_id_left=&slcx_id_left=&qzcs_id_left=&fzxt_id_left=&xfpdys_id_left=&zs_id_left=&xf_id_left=&zzdz_id_left=&xzxwxl_id_left=&xzcpjg_id_left=&zxbd_id_left=&zxgr_id_left=&zxjg_id_left=&zhengju_id_left=&judgmoney_id_left=" http://faxin.cn/lib/cpws/GetCpwsSearchList.ashx`
const cmds = _.times(10000, n => cmd({ page: parseInt(n + idx) }))

async.eachSeries(cmds, (cmd, cmdCallback) => {
  const content = JSON.parse(shell.exec(cmd, { silent: true }).stdout)
  osmosis.parse(content.FirstHtml)
    .set([osmosis.find('li').set({
      title: '.fz-title1',
      url: '.fz-title1 a@href'
    })])
    .data(set => {
      set = _.filter(set, ({ title }) => title)
      setTimeout(() => {
        fs.writeFileSync('./faxinidx/' + idx + '.json', JSON.stringify(set, null, 2))
        console.log('fetching index', idx)
        idx += 1
        cmdCallback()
      }, 500)
    })
}, err => {
  console.log('done')
})
