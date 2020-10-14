<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-mate :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-mate :article="article" />
      </div>

      <!-- 文章评论 -->
      <article-comments :article="article" />
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMate from "./components/article-mate";
import ArticleComments from "./components/article-comments";

export default {
  name: "ArticleIndex",
  middleware: "authenticated",
  components: { ArticleMate, ArticleComments },
  async asyncData({ params }) {
    const {
      data: { article },
    } = await getArticle(params.slug);
    console.log(article);
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return { article };
  },
  head() {
    return {
      title: `${this.article.title} - Realworld`,
      meta: [
        {
          // 唯一标识，避免重复渲染
          // 相当于 key
          hid: "ArticleIndex",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>