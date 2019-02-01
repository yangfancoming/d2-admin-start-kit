import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
      url: '/login',
      // url: '/auth/login',
      method: 'post',
      data
  })
}
