import axios from 'axios'
import x2j from 'xml2js'
import express from 'express'

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
      console.log(err)
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
          href: `${this.options.build.publicPath}articles/note_rss.json`
        }
      ]
    ]

    // dev時はここで終了
    if (process.env.NODE_ENV !== 'production') return

    // generate時にexpress立ててhttpでjson取得できるようにする
    this.requireModule(['@nuxtjs/axios'])
    this.nuxt.hook('build:done', (generator) => {
      console.log('**[generate]** opening server connection')
      const app = express()
      app.use(express.static(this.options.generate.dir))
      const server = app.listen(process.env.PORT || 3000)

      this.nuxt.hook('generate:done', () => {
        console.log('**[generate]** closing server connection')
        server.close()
      })
    })
  })
}
