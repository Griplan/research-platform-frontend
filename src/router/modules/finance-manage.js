import Layout from '@/layout'

const financeManage = {
  path: '/finance-manage',
  component: Layout,
  redirect: '/finance-manage/index',
  children: [{
      path: '/finance-manage/index',
      name: 'financeManageIndex',
      component: () => import('@/views/admin/finance-manage/index'),
      meta: {
        title: '财务管理',
        icon: 'finance',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    }
  ]
}

export default financeManage
