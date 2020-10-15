<template>
  <div class="article-meta">
    <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }">
      <img :src="article.author.image"/>
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{ name: 'profile', params: { username: article.author.username } }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>

    <!-- 我的文章 -->
    <template v-if="isMine">
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{ name: 'editor', params: { slug: article.slug } }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      &nbsp;
      <button class="btn btn-outline-danger btn-sm" :disabled="isDeleting" @click="deleteArticle()">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <!-- 别人的文章 -->
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following }">
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }} <span class="counter">(10)</span>
      </button>
      &nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{ active: article.favorited }">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
    
  </div>
</template>

<script>
import { mapState } from "vuex"
import { deleteArticle } from "@/api/article"

export default {
  name: "ArticleMate",
  data() {
    return {
      isDeleting: false
    }
  },
  props: ["article"],
  computed: {
    ...mapState(["user"]),
    // 文章是登录用户的
    isMine() {
      return this.user.username === this.article.author.username
    }
  },
  methods: {
    async deleteArticle () {
      this.isDeleting = true;
      await deleteArticle(this.article.slug);
      this.$router.push({ name: "home"});
      // this.isDeleting = false;
    }
  }
}
</script>

<style>

</style>