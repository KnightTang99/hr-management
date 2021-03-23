import request from '@/utils/request'
// 获取员工简单列表
export function getSimpleList() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
