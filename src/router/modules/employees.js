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
    },
    {
      path: 'detail/:id?',
      component: () => import('@/views/employees/detail'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    },
    {
      path: `print/:id`,
      component: () => import('@/views/employees/components/print'),
      hidden: true,
      meta: {
        title: '打印'
      }
    }
  ]
}
