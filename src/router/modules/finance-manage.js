import Layout from '@/layout'

const financeManage = {
  path: '/finance-manage',
  component: Layout,
  redirect: '/finance-manage/index',
  name: 'financeManage',
  meta: {
    title: '财务管理',
    icon: 'finance',
    node: 'finance_detail',
    activeClass: 'finance'
  },
  alwaysShow: true,
  children: [{
      path: '/finance-manage/index',
      name: 'financeManageIndex',
      component: () => import('@/views/admin/finance-manage/index'),
      meta: {
        title: '主菜单',
        node: 'finance_detail',
        activeClass: 'finance'
      }
  },
    {
      path: '/finance-manage/account',
      name: 'financeAccount',
      component: () => import('@/views/admin/finance-manage/account/index'),
      meta: {
        title: '账户管理',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    },
    {
      path: '/finance-manage/bill',
      name: 'financeBill',
      component: () => import('@/views/admin/finance-manage/bill/index'),
      meta: {
        title: '账单管理',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    }
  ]
}

export default financeManage
