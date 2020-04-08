<template>
  <div class="container">
    <div>
      <h1 class="ttl">note rss post list</h1>
      <ul class="card_list">
        <postCard
          v-for="(post, index) in posts"
          :key="`post-${index}`"
          :post="post"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import postCard from '~/components/postCard'

export default {
  components: {
    postCard
  },
  async asyncData({ app, error }) {
    try {
      const feed = await app.$axios.get('/_nuxt/articles/note_rss.json')
      const posts = feed.data.find((d) => {
        return d.name === 'mag01'
      })
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
  margin: 50px auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.ttl {
  margin-bottom: 20px;
}
.card_list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
