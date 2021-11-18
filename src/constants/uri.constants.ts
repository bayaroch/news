const DOMAIN = process.env.NEXT_PUBLIC_API
const REST_API_PATH = '/wp-json/wp/v2/'
const API_ROOT = DOMAIN + REST_API_PATH

export const URI = {
  ALL_POSTS: API_ROOT + 'posts',
  POST: API_ROOT + 'post',
}
