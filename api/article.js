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