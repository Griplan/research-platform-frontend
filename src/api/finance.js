import request from '@/utils/request'

export function financeStatistics(params) {
    return request({
      url: '/finance/statistics',
      method: 'get',
      params
    })
}

export function total(params) {
    return request({
      url: '/finance/total',
      method: 'get',
      params
    })
}

export function platformList(params) {
    return request({
      url: '/finance/platform-list',
      method: 'get',
      params
    })
}

export function allConsumeRecord(params) {
    return request({
      url: '/animal/finance/consumptionRecords/page',
      method: 'get',
      params
    })
}

//最近退款记录
  export function allRefundRecord(params) {
      return request({
        url: '/animal/finance/refundRecord/page',
        method: 'get',
        params
      })
  }

//最近的付款记录
export function allPaymentRecord(params) {
    return request({
      url: '/animal/finance/payment/page',
      method: 'get',
      params
    })
}

//账户管理
export function allAccount(params) {
    return request({
      url: '/research-group-account/list',
      method: 'get',
      params
    })
}

//账单管理
export function getClassifiedBill(params) {
    return request({
      url: '/animal/finance/bill/getClassifiedBill',
      method: 'get',
      params
    })
}

//消费账单汇总
export function getConsumeBill(params) {
    return request({
      url: '/animal/finance/bill/page',
      method: 'get',
      params
    })
}

//付款记录
export function getPaymentRecord(params) {
    return request({
      url: '/animal/finance/payment/page',
      method: 'get',
      params
    })
}
//新增付款记录
export function addPaymentRecord(data) {
    return request({
      url: '/animal/finance/payment',
      method: 'post',
      data
    })
}

