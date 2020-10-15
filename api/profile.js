import { request } from "@/plugins/request"

// Get Profile
export const getProfile = username => {
  return request({
    method: "GET",
    url: `/api/profiles/${username}`
  })
}

// Follow User
export const follow = username => {
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`
  })
}

// Unfollow User
export const unfollow = username => {
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`
  })
}
