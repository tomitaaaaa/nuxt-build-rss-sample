<template>
  <li class="card">
    <div class="card__ttl">{{ title }}</div>
    <div class="card__img">
      <img :src="coverImg" />
    </div>
    <div class="card__body">
      <div class="card__description">{{ description }}</div>
      <div class="card__link">
        <a :href="link" target="_blank" rel="noopener">記事へ</a>
      </div>
      <div class="card__date">{{ date }}</div>
    </div>
  </li>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import noimage from '~/assets/img/noimage.png'
export default {
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title: this.post.title ? this.post.title[0] : '',
      coverImg: this.post['media:thumbnail']
        ? this.post['media:thumbnail'][0]
        : noimage,
      description: this.post.description[0]
        ? this.post.description[0].replace(
            /<("[^"]*"|'[^']*'|[^'">])*>|続きをみる/g,
            ''
          )
        : 'notext',
      link: this.post.link ? this.post.link[0] : '',
      date: this.post.pubDate
        ? dayjs(this.post.pubDate[0]).format('YYYY.MM.DD')
        : ''
    }
  }
}
</script>

<style lang="scss">
.card {
  width: 100%;
  max-width: 750px;
  margin-bottom: 30px;
  line-height: 2;
  border: 1px solid #eeeeee;
  text-align: left;
  &__ttl {
    font-size: 24px;
    padding: 10px;
  }
  &__body {
    padding: 0 30px 15px;
  }
  &__description {
    margin-bottom: 15px;
  }
  &__link {
    width: 150px;
    margin: 0 auto 15px;
    line-height: 30px;
    text-align: center;
    a {
      display: block;
      color: #fff;
      font-weight: bold;
      text-decoration: none;
      font-size: 12px;
      background-color: #59b1eb;
      border: 3px solid #59b1eb;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;

      &:hover {
        color: #999;
        background-color: #fff;
      }
    }
  }
  img {
    width: 100%;
  }
}
</style>
