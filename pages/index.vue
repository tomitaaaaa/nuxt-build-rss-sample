<template>
  <div class="container">
    <div>
      <ul id="example-1">
        <li v-for="(post, index) in posts" :key="index" class="card">
          <div class="card__ttl">{{ post.title[0] }}</div>
          <img
            v-if="post['media:thumbnail']"
            :src="post['media:thumbnail'][0]"
          />
          <img v-else src="~/assets/img/noimage.png" />

          <div v-html="post.description[0]"></div>
          <p>{{ post.pubDate[0] }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, error }) {
    try {
      const feed = await app.$axios.get('/_nuxt/articles/note_rss.json')
      const posts = feed.data.find((d) => {
        return d.name === 'mag01'
      })
      console.log(posts.posts[0].item)
      return { posts: posts.posts[0].item }
    } catch (err) {
      error({
        statusCode: err.response.status,
        message: err.response.data.message
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.card {
  width: 500px;
  margin-bottom: 30px;
  line-height: 2;
  &__ttl {
    font-size: 24px;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
  }
}
</style>
