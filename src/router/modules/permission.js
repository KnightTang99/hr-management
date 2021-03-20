import layout from '@/layout/index'
export default {
  path: '/permission',
  name: 'permission',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
