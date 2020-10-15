<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="publishArticle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle, getArticle, updateArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: "EditorIndex",
  middleware: "authenticated",
  async asyncData ({ params }) {
    let isEditor = false
    if (params && params.slug) {
      isEditor = true
      const { data: { article } } = await getArticle(params.slug);
      return { article, isEditor }
    }
    return { isEditor }
  },
  data () {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      }
    }
  },
  computed: {
    tags: {
      get () {
        return this.article.tagList.join(", ")
      },
      set (newVal, oldVal) {
        if (newVal !== oldVal) {
          let arr = [...newVal.split(",")];
          arr = arr.map(item => item.trim());
          this.article.tagList = arr;
        }
      }
    },
    ...mapState(["user"])
  },
  methods: {
    async publishArticle() {
      const handleArticle = this.isEditor ? updateArticle : addArticle;
      const { data: { article } } = await handleArticle(this.article)
      this.$router.push({ name: "article", params: { slug: article.slug } })
    }
  }
};
</script>

<style>
</style>