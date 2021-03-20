import layout from '@/layout/index'
export default {
  path: '/salarys',
  name: 'salarys',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
