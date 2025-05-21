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
      url: '/animal/finance/payment/add',
      method: 'post',
      data
    })
}
//编辑付款记录
export function editPaymentRecord(data) {
    return request({
      url: '/animal/finance/payment/update',
      method: 'post',
      data
    })
}

//入账
export function inPayRecord(params) {
    return request({
      url: '/animal/finance/payment/postToAccount',
      method: 'post',
      params
    })
}

//取消入账
export function cancelInPayRecord(params) {
    return request({
      url: '/animal/finance/payment/cancel',
      method: 'post',
      params
    })
}

//新增退款记录
export function addRefundRecord(data) {
    return request({
      url: '/animal/finance/refundRecord/add',
      method: 'post',
      data
    })
}

//退款记录入账
export function inRefundRecord(params) {
    return request({
      url: '/animal/finance/refundRecord/postToAccount',
      method: 'post',
      params
    })
}
//删除退款记录
export function deleteRefundRecord(params) {
    return request({
      url: '/animal/finance/refundRecord/delete',
      method: 'delete',
      params
    })
}
  
//退款记录取消入账
export function cancelInRefundRecord(params) {
    return request({
      url: '/animal/finance/refundRecord/cancel',
      method: 'post',
      params
    })
}