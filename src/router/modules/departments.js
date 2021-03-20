import layout from '@/layout/index'
export default {
  path: '/departments',
  name: 'departments',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
