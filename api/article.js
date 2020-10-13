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