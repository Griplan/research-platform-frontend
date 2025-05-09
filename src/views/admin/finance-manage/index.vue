<template>
  <div class="finance-manage-container">
    <div class="finance-content">
      <div class="left-section">
        <!-- 最近的付款记录 -->
        <div class="table-container">
          <h2>最近的付款记录</h2>
          <el-table
            :data="paymentRecords"
            :header-cell-style="{ background: '#fafafa', padding: '2px 0' }"
            style="width: 100%"
            v-loading="paymentLoading"
            :cell-style="{ padding: '2px 0' }"
            size="mini"
            border
          >
            <el-table-column prop="id" label="付款记录编号" width="100" />
            <el-table-column prop="accountId" label="账户编号" />
            <el-table-column prop="handler" label="经手人" width="60" />
            <el-table-column prop="amount" label="金额" width="90" />
            <el-table-column prop="paymentMethod" label="支付方式" width="75" />
            <el-table-column prop="paymentTime" label="到账时间" width="75" />
            <el-table-column prop="remark" label="备注" width="80" />
            <el-table-column prop="status" label="状态标识" width="80">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">{{
                  scope.row.status
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="110" />
            <el-table-column prop="creator" label="创建人" width="100" />
          </el-table>
        </div>

        <!-- 最近的退款记录 -->
        <div class="table-container">
          <h2>最近的退款记录</h2>
          <el-table
            :data="refundRecords"
            :header-cell-style="{ background: '#fafafa', padding: '2px 0' }"
            style="width: 100%"
            v-loading="refundLoading"
            :cell-style="{ padding: '2px 0' }"
            size="mini"
            border
          >
            <el-table-column prop="id" label="退款编号" width="80" />
            <el-table-column prop="date" label="退款日期" width="75" />
            <el-table-column prop="accountId" label="账户编号" width="75" />
            <el-table-column prop="amount" label="金额" width="60" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="status" label="状态标识" width="80">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">{{
                  scope.row.status
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="110" />
            <el-table-column prop="creator" label="创建人" width="100" />
          </el-table>
        </div>
      </div>

      <div class="right-section">
        <!-- 最近的消费记录 -->
        <div class="table-container">
          <h2>最近的消费记录</h2>
          <el-table
            :data="consumeRecords"
            :header-cell-style="{ background: '#fafafa', padding: '2px 0' }"
            style="width: 100%"
            v-loading="consumeLoading"
            :cell-style="{ padding: '2px 0' }"
            size="mini"
            border
          >
            <el-table-column prop="id" label="消费记录编号" width="93" />
            <el-table-column prop="date" label="消费日期" width="90" />
            <el-table-column prop="accountId" label="账户编号" width="75" />
            <el-table-column prop="handler" label="经手人" width="60" />
            <el-table-column prop="amount" label="金额" width="60" />
            <el-table-column prop="category" label="费用类别" width="75" />
            <el-table-column prop="paymentMethod" label="结算方式" width="75" />
            <el-table-column prop="remark" label="备注" width="80" />
            <el-table-column prop="status" label="状态标识" width="80">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">{{
                  scope.row.status
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="90" />
            <el-table-column prop="creator" label="创建人" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinanceManage',
  data() {
    return {
      // 付款记录数据
      paymentLoading: false,
      paymentRecords: [
        {
          id: 'P001',
          date: '2023-06-01',
          accountId: 'A001',
          handler: '张三',
          amount: '5000.00',
          category: '设备采购',
          paymentMethod: '银行转账',
          remark: '实验室设备',
          status: '已完成',
          createTime: '2023-06-01',
          creator: '李四'
        },
        {
          id: 'P002',
          date: '2023-06-05',
          accountId: 'A002',
          handler: '王五',
          amount: '3000.00',
          category: '耗材采购',
          paymentMethod: '现金',
          remark: '实验室耗材',
          status: '处理中',
          createTime: '2023-06-05',
          creator: '赵六'
        }
      ],

      // 退款记录数据
      refundLoading: false,
      refundRecords: [
        {
          id: 'R001',
          date: '2023-06-10',
          accountId: 'A001',
          handler: '张三',
          amount: '1000.00',
          category: '设备维修',
          paymentMethod: '银行转账',
          remark: '设备故障退款',
          status: '已完成',
          createTime: '2023-06-10',
          creator: '李四'
        },
        {
          id: 'R002',
          date: '2023-06-15',
          accountId: 'A003',
          handler: '王五',
          amount: '2000.00',
          category: '服务费',
          paymentMethod: '现金',
          remark: '服务质量问题',
          status: '处理中',
          createTime: '2023-06-15',
          creator: '赵六'
        }
      ],

      // 消费记录数据
      consumeLoading: false,
      consumeRecords: [
        {
          id: 'C001',
          date: '2023-06-02',
          accountId: 'A001',
          handler: '张三',
          amount: '500.00',
          category: '办公用品',
          paymentMethod: '现金',
          remark: '文具采购',
          status: '已完成',
          createTime: '2023-06-02',
          creator: '李四'
        },
        {
          id: 'C002',
          date: '2023-06-08',
          accountId: 'A002',
          handler: '王五',
          amount: '800.00',
          category: '餐饮费',
          paymentMethod: '微信支付',
          remark: '团队餐费',
          status: '已完成',
          createTime: '2023-06-08',
          creator: '赵六'
        },
        {
          id: 'C003',
          date: '2023-06-12',
          accountId: 'A003',
          handler: '赵六',
          amount: '1200.00',
          category: '交通费',
          paymentMethod: '银行转账',
          remark: '出差交通',
          status: '处理中',
          createTime: '2023-06-12',
          creator: '李四'
        }
      ]
    };
  },
  methods: {
    // 获取付款记录
    fetchPaymentRecords() {
      this.paymentLoading = true;
      // 这里应该是实际的API调用
      // 示例：this.$api.finance.getPaymentRecords().then(res => { ... })
      setTimeout(() => {
        this.paymentLoading = false;
      }, 1000);
    },

    // 获取退款记录
    fetchRefundRecords() {
      this.refundLoading = true;
      // 这里应该是实际的API调用
      // 示例：this.$api.finance.getRefundRecords().then(res => { ... })
      setTimeout(() => {
        this.refundLoading = false;
      }, 1000);
    },

    // 获取消费记录
    fetchConsumeRecords() {
      this.consumeLoading = true;
      // 这里应该是实际的API调用
      // 示例：this.$api.finance.getConsumeRecords().then(res => { ... })
      setTimeout(() => {
        this.consumeLoading = false;
      }, 1000);
    }
  },
  created() {
    this.fetchPaymentRecords();
    this.fetchRefundRecords();
    this.fetchConsumeRecords();
  }
};
</script>

<style lang="scss" scoped>
.finance-manage-container {
  padding: 20px;

  h1 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .finance-content {
    display: flex;
    gap: 20px;

    .left-section {
      width: 52%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .right-section {
      width: 48%;
    }

    .table-container {
      background-color: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      border-top: 3px solid #4b7cb1;

      :deep(.el-table) {
        font-size: 11px;

        th,
        td {
          padding: 2px;
        }

        .cell {
          line-height: 16px;
          padding-left: 2px;
          padding-right: 2px;
        }

        .el-tag {
          padding: 0 2px;
          height: 18px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
