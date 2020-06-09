<template>
  <div class="container">
    <div>
      <h1 class="ttl">note rss post list</h1>
      <p>from dispatch</p>
      <div class="page_nav">
        <nuxt-link to="/otherpage">go to mag02</nuxt-link>
      </div>
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
