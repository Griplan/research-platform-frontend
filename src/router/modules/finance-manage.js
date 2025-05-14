import Layout from '@/layout'

const financeManage = {
  path: '/finance-manage',
  component: Layout,
  redirect: '/finance-manage/index',
  name: 'financeManage',
  meta: {
    title: '财务管理',
    icon: 'finance-manage',
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
    },
    {
      path: '/finance-manage/pay-record',
      name: 'financePayRecord',
      component: () => import('@/views/admin/finance-manage/pay-record/index'),
      meta: {
        title: '支付记录',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    },
    {
      path: '/finance-manage/refund-record',
      name: 'financeRefundRecord',
      component: () => import('@/views/admin/finance-manage/refund-record/index'),
      meta: {
        title: '退款记录',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    },
    {
      path: '/finance-manage/consume-record',
      name: 'financeConsumeRecord',
      component: () => import('@/views/admin/finance-manage/consumeRecord/index'),
      meta: {
        title: '消费记录',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    },
    {
      path: '/finance-manage/account-statement',
      name: 'financeAccountStatement',
      component: () => import('@/views/admin/finance-manage/accountStatement/index'),
      meta: {
        title: '账目流水',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    },
    {
      path: '/finance-manage/financial-statistics',
      name: 'financeFinancialStatistics',
      component: () => import('@/views/admin/finance-manage/financialStatistics/index'),
      meta: {
        title: '财务统计',
        node: 'finance_detail',
        activeClass: 'finance'
      }
    }
  ]
}

export default financeManage
