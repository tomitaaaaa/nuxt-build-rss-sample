import axios from 'axios'
import x2j from 'xml2js'

module.exports = function rssToJson(moduleOptions) {
  this.nuxt.hook('build:before', async (builder) => {
    // データ取得
    let xmls
    try {
      xmls = await Promise.all(
        moduleOptions.rss.map((target) => {
          return axios.get(target.url)
        })
      )
    } catch (err) {
      return
    }

    // xmlをjsonに変換
    const data = []
    xmls.forEach((item, index) => {
      let posts
      x2j.parseString(item.data, (error, result) => {
        if (error) {
        } else {
          posts = result.rss.channel
        }
      })
      data.push({
        ...moduleOptions.rss[index],
        posts
      })
    })

    // JSONを生成
    this.options.build.plugins.push({
      apply(compiler) {
        compiler.plugin('emit', (compilation, cb) => {
          compilation.assets[`articles/note_rss.json`] = {
            source: () => JSON.stringify(data),
            size: () => {}
          }
          cb()
        })
      }
    })

    // prefetchに追加
    this.options.head.link = [
      ...this.options.head.link,
      ...[
        {
          rel: 'prefetch',
          href: `${process.env.API_URL}${this.options.build.publicPath}articles/note_rss.json`
        }
      ]
    ]
  })
}
