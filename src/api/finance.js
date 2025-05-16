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
