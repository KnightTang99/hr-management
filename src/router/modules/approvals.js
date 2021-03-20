import layout from '@/layout/index'
export default {
  path: '/approvals',
  name: 'approvals',
  component: layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
