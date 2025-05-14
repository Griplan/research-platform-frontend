<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="基础统计" name="first">
        <div>
          <el-row :gutter="20">
            <el-col :span="13">
              <div class="statistics-card">
                <div class="card-header">概况</div>
                <div class="card-body">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="总账户数" prop="totalAccounts">
                      {{ statistics.totalAccounts }}
                    </el-form-item>
                    <el-form-item label="欠费账户数" prop="overdueAccounts">
                      {{ statistics.overdueAccounts }}
                    </el-form-item>
                    <el-form-item label="付款总额" prop="totalPayment">
                      {{ statistics.totalPayment }}
                    </el-form-item>
                    <el-form-item label="退款总额" prop="totalRefund">
                      {{ statistics.totalRefund }}
                    </el-form-item>
                    <el-form-item label="消费总额" prop="totalConsumption">
                      {{ statistics.totalConsumption }}
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
            <el-col :span="11">
              <div class="right-card">
                <div class="statistics-card">
                  <div class="card-header">付款统计</div>
                </div>
                <div class="statistics-card">
                  <div class="card-header">财务统计</div>
                </div>
                <div class="statistics-card">
                  <div class="card-header">收支统计</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="欠费统计" name="second">
        <div>
          <div class="header-container">
            <h4>欠费统计</h4>
            <div class="button-container">
              <el-button size="mini" icon="el-icon-search">查找</el-button>
            </div>
          </div>
          <div class="table-container">
            <el-table
              :data="recordList"
              :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
              v-loading="loading"
              border
              size="small"
              style="width: 100%"
            >
              <el-table-column prop="id" label="消费记录编号" width="110" />
              <el-table-column prop="consumeDate" label="消费日期" width="100">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.consumeDate) }}
                </template>
              </el-table-column>
              <el-table-column prop="accountId" label="账户编号" width="100" />
              <el-table-column prop="handler" label="经手人" width="90" />
              <el-table-column prop="amount" label="金额" sortable width="90">
                <template slot-scope="scope">
                  {{ scope.row.amount.toFixed(2) }}
                </template>
              </el-table-column>
              <el-table-column prop="category" label="费用类别" width="100" />
              <el-table-column prop="payMethod" label="结算方式" width="100" />
              <el-table-column prop="remark" label="备注" />
              <el-table-column prop="status" label="状态标识" width="90">
                <template slot-scope="scope">
                  <el-tag :type="getStatusType(scope.row.status)">
                    {{ getStatusText(scope.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="100">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.createTime) }}
                </template>
              </el-table-column>
              <el-table-column prop="creator" label="创建人" width="90" />
              <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleEdit(scope.row)"
                    :disabled="!canEdit(scope.row)"
                  >
                    编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              class="pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: 'first',
      loading: false,
      recordList: [
        {
          id: 'CR20230001',
          consumeDate: '2023-04-01',
          accountId: 'ACC001',
          handler: '张三',
          amount: 12500.0,
          category: '动物费',
          payMethod: '银行转账',
          remark: '第一季度动物采购费用',
          status: 1, // 1: 已结算, 2: 待结算, 3: 已取消
          createTime: '2023-03-30',
          creator: '李四'
        },
        {
          id: 'CR20230002',
          consumeDate: '2023-07-05',
          accountId: 'ACC002',
          handler: '王五',
          amount: 8600.0,
          category: '饲养费',
          payMethod: '支付宝',
          remark: '二季度饲养支出',
          status: 1, // 1: 已结算, 2: 待结算, 3: 已取消
          createTime: '2023-07-01',
          creator: '赵六'
        },
        {
          id: 'CR20230003',
          consumeDate: '2023-10-02',
          accountId: 'ACC003',
          handler: '钱七',
          amount: 14800.0,
          category: '技术服务费',
          payMethod: '微信支付',
          remark: '三季度技术服务支出',
          status: 2, // 1: 已结算, 2: 待结算, 3: 已取消
          createTime: '2023-09-30',
          creator: '孙八'
        }
      ],
      pagination: {
        page: 1,
        size: 10
      },
      total: 3,
      // 统计数据
      statistics: {
        totalAccounts: 25,
        overdueAccounts: 3,
        totalPayment: 256800.5,
        totalRefund: 12500.0,
        totalConsumption: 189650.75
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      // 根据标签类型加载不同数据
      this.fetchRecordList();
    },
    handleSizeChange(val) {
      this.pagination.size = val;
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchRecordList();
    },
    fetchRecordList() {
      this.loading = true;
      // 这里应该是实际的API调用，获取消费记录列表数据
      // 可以根据activeName过滤不同类别的记录
      // const params = {
      //   ...this.pagination,
      //   category: this.getCategory(this.activeName)
      // };
      // this.$api.finance.getConsumeRecordList(params).then(res => {
      //   this.recordList = res.data.records;
      //   this.total = res.data.total;
      // }).finally(() => {
      //   this.loading = false;
      // });

      // 模拟数据加载
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    // 获取状态类型
    getStatusType(status) {
      switch (status) {
        case 1:
          return 'success';
        case 2:
          return 'warning';
        case 3:
          return 'danger';
        default:
          return 'info';
      }
    },
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 1:
          return '已结算';
        case 2:
          return '待结算';
        case 3:
          return '已取消';
        default:
          return '未知';
      }
    },
    // 处理编辑
    handleEdit(row) {
      this.$message.info(`编辑消费记录：${row.id}`);
      // 这里应该跳转到编辑页面或打开编辑对话框
      // this.$router.push(`/finance-manage/consume-record/edit/${row.id}`);
    },
    // 判断是否可以编辑
    canEdit(row) {
      return row.status === 2; // 只有待结算状态可以编辑
    },
    // 判断是否可以取消
    canCancel(row) {
      return row.status === 2; // 只有待结算状态可以取消
    },
    // 格式化日期为 yyyy-mm-dd
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    // 获取账户状态类型
    getAccountStatusType(status) {
      switch (status) {
        case 1:
          return 'success';
        case 2:
          return 'warning';
        case 3:
          return 'danger';
        default:
          return 'info';
      }
    },
    // 获取账户状态文本
    getAccountStatusText(status) {
      switch (status) {
        case 1:
          return '正常';
        case 2:
          return '冻结';
        case 3:
          return '停用';
        default:
          return '未知';
      }
    },
    // 处理发送
    handleSend(row) {
      this.$message.info(`发送账户通知到: ${row.accountName}`);
      // 这里应该是实际的发送通知逻辑
      // this.$api.finance.sendAccountNotification(row.accountId).then(res => {
      //   if (res.code === 200) {
      //     this.$message.success('通知已发送');
      //   }
      // });
    }
  },
  created() {
    this.fetchRecordList();
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;

  .custom-tabs {
    overflow: hidden;
    margin-top: 10px;
    border: none;
    background: #fff;

    :deep(.el-tabs__header) {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
    }
  }
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  color: #457cb8;

  .button-container {
    display: flex;
  }
}
.table-container {
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  border-top: 3px solid #4b7cb1;
  border-left: 1px solid #f4f4f5;
  border-right: 1px solid #f4f4f5;
  border-bottom: 1px solid #f4f4f5;

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

  .pagination {
    text-align: center;
    margin-top: 15px;
  }
}
.statistics-card {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-top: 3px solid #4b7cb1;
  border-left: 1px solid #f4f4f5;
  border-right: 1px solid #f4f4f5;
  border-bottom: 1px solid #f4f4f5;

  .card-header {
    padding: 12px 15px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    font-weight: bold;
    color: #303133;
    font-size: 15px;
  }

  .card-body {
    padding: 15px;
  }

  .statistics-value {
    font-size: 16px;
    font-weight: bold;
    color: #409eff;
  }
}
.right-card {
  display: flex;
  flex-direction: column;
}
</style>
