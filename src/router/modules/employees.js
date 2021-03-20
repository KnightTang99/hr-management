import layout from '@/layout/index'
export default {
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    }
  ]
}
