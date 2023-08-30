// 携带登录态credentials必须为include
export default function fetch(url: RequestInfo, options: RequestInit = {}) {
  return window.fetch(url, { ...options, credentials: 'omit' })
}
