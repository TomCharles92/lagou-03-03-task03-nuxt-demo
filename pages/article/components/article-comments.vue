<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="article.author.image" class="comment-author-img"
          />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      <!-- 评论列表 -->
      <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <nuxt-link 
            class="comment-author" 
            :to="{ name: 'profile', params: { username: comment.author.username } }">
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link 
            class="comment-author" 
            :to="{ name: 'profile', params: { username: comment.author.username } }">{{ comment.author.username }}</nuxt-link>
          <span class="date-posted">{{ comment.createdAt | date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from "@/api/article";

// 方便查看文章评论 slug：minima-qui-i9xszh
// 我自己添加了评论
export default {
  name: "ArticleComments",
  props: ["article"],
  data() {
    return {
      comments: []
    }
  },
  async created () {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments
  }
}
</script>

<style>

</style>