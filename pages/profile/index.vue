<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="handleFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unfollow" : "Follow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <article-preview v-for="article in myArticles" :key="article.slug" :article="article"/>

          <!-- <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, follow, unfollow } from "@/api/profile";
import { getArticles } from "@/api/article";
import ArticlePreview from "@/components/article-preview"

export default {
  name: "ProfileIndex",
  middleware: "authenticated",
  components: { ArticlePreview },
  async asyncData({ params }) {
    const { data: { profile } } = await getProfile(params.username);
    const { data: { articles: myArticles } } = await getArticles({ author: params.username })
    return { profile, myArticles };
  },
  methods: {
    // 处理关注
    async handleFollow() {
      if (this.profile.following) {
        // 取消关注
        await unfollow(this.profile.username);
        this.profile.following = false;
      } else {
        // 关注
        await follow(this.profile.username);
        this.profile.following = true;
      }
    },
  },
};
</script>

<style>
</style>