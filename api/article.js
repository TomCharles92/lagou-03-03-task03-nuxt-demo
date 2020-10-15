import { request } from "@/plugins/request"

// 获取所有公共文章
export const getArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles",
    params
  })
}

// 获取用户关注的文章
export const getFeedArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params
  })
}

// 点赞文章
export const addFavorite = slug => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`
  })
}

// 新建文章
export const addArticle = article => {
  return request({
    method: "POST",
    url: "/api/articles",
    data: { article }
  })
}

// 修改文章
export const updateArticle = article => {
  return request({
    method: "PUT",
    url: `/api/articles/${article.slug}`,
    data: { article }
  })
}

// 删除文章
export const deleteArticle = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}`
  })
}