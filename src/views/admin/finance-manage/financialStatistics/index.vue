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
                    <el-form-item label="总账户数" prop="account_number">
                      {{ statistics.account_number }}
                    </el-form-item>
                    <el-form-item label="欠费账户数" prop="overdue_account_number">
                      {{ statistics.overdue_account_number }}
                    </el-form-item>
                    <el-form-item label="付款总额" prop="payment_amount">
                      {{ statistics.payment_amount }}
                    </el-form-item>
                    <el-form-item label="退款总额" prop="refund_amount">
                      {{ statistics.refund_amount }}
                    </el-form-item>
                    <el-form-item label="消费总额" prop="consumption_amount">
                      {{ statistics.consumption_amount }}
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
              <el-table-column prop="research_group_id" label="账户编号" width="110" />
              <el-table-column prop="name" label="账户名称" />
              <el-table-column prop="note" label="备注" />
              <el-table-column prop="debt_amount" label="可透支额度" sortable />
              <el-table-column prop="amount" label="账户余额" sortable />
              <el-table-column prop="frozen_amount" label="冻结金额" sortable />
              <el-table-column prop="inter_amount" label="可消费额度" sortable />
              <el-table-column prop="created_at" label="创建时间" width="100">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.created_at) }}
                </template>
              </el-table-column>
              <el-table-column prop="updated_at" label="修改时间" width="100">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.updated_at) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleSend(scope.row)">
                    发送
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              class="pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.pageNo"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagination.pageSize"
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
import { getBaseStatistics, getDebtStatistics, getOverdueAccountNumber } from '@/api/finance';
export default {
  components: {},
  data() {
    return {
      activeName: 'first',
      loading: false,
      recordList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      // 统计数据
      statistics: {
        account_number: 0,
        overdue_account_number: 0,
        payment_amount: 0,
        refund_amount: 0,
        consumption_amount: 0
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
        case 'first':
          this.fetchBaseStatistics();
          break;
        case 'second':
          this.fetchDebtStatistics();
          break;
      }
    },
    //欠费统计
    fetchDebtStatistics() {
      this.loading = true;
      getDebtStatistics(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.recordList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //基础统计
    fetchBaseStatistics() {
      this.loading = true;
      getBaseStatistics()
        .then(res => {
          if (res.status === 1) {
            this.statistics = res.data;
            this.total = res.data.overdue_account_number;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchRecordList();
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
    this.fetchBaseStatistics();
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
