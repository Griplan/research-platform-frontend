<template>
  <div>
    <div class="header-container">
      <h4>设施账单汇总</h4>
      <div class="button-container">
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-refresh-right"
          @click="showGenerateDialog"
          >生成账单</el-button
        >
        <el-button size="mini" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="table-container">
      <div class="fee-title">
        饲养费:￥{{ fee.feedingFee }}&nbsp;&nbsp;&nbsp;&nbsp;进出费:￥{{
          fee.inOutFee
        }}&nbsp;&nbsp;&nbsp;&nbsp;加班费:￥{{ fee.overtimeFee }}
      </div>
      <el-table
        :data="billList"
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="id" label="账单编号" width="140" />
        <el-table-column prop="name" label="中心名称" />
        <el-table-column prop="start_time" label="开始日期" width="120">
          <template slot-scope="scope">
            {{ formatDate(scope.row.start_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="截止日期" width="120">
          <template slot-scope="scope">
            {{ formatDate(scope.row.end_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="year" label="统计年份" width="90" />
        <el-table-column prop="quarter" label="统计季度" width="90" />
        <el-table-column prop="month" label="统计月份" width="90" />
        <el-table-column prop="breedingFee" label="饲养费" width="120">
          <template slot-scope="scope">
            {{ scope.row.breedingFee }}
          </template>
        </el-table-column>
        <el-table-column prop="inOutFee" label="进出费" width="120">
          <template slot-scope="scope">
            {{ scope.row.inOutFee }}
          </template>
        </el-table-column>
        <el-table-column prop="overtimeFee" label="加班费" width="120">
          <template slot-scope="scope">
            {{ scope.row.overtimeFee }}
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

    <!-- 生成账单对话框 -->
    <generate-bill-dialog
      v-if="generateDialogVisible"
      @submit="handleGenerateBill"
      @close="generateDialogVisible = false"
    />
  </div>
</template>

<script>
import GenerateBillDialog from './GenerateBillDialog.vue';
import { getClassifiedBill } from '@/api/finance';

export default {
  name: 'ConsumeBill',
  components: {
    GenerateBillDialog
  },
  data() {
    return {
      generateDialogVisible: false,
      fee: {
        feedingFee: 24826,
        inOutFee: 1000,
        overtimeFee: 3000
      },
      loading: false,
      billList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        billType: '设施使用'
      },
      total: 3
    };
  },
  methods: {
    // 显示生成账单对话框
    showGenerateDialog() {
      this.generateDialogVisible = true;
    },

    // 处理生成账单
    handleGenerateBill() {
      // 这里可以添加生成账单的逻辑
      this.$message.success('账单生成任务已提交，请等待系统处理');
      // 刷新表格数据
      this.fetchBillList();
    },

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.fetchBillList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchBillList();
    },
    fetchBillList() {
      this.loading = true;
      getClassifiedBill(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.billList = res.data.records;
            this.total = res.data.total;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    confirmBill(row) {
      this.$confirm('确认此账单信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 这里应该是实际的API调用，确认账单
          // this.$api.finance.confirmBill(row.id).then(res => {
          //   if (res.code === 200) {
          //     this.$message.success('账单确认成功');
          //     this.fetchBillList();
          //   }
          // });

          // 模拟操作成功
          row.isConfirmed = true;
          this.$message.success('账单确认成功');
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    sendBill(row) {
      this.$confirm('确认发送此账单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 这里应该是实际的API调用，发送账单
          // this.$api.finance.sendBill(row.id).then(res => {
          //   if (res.code === 200) {
          //     this.$message.success('账单发送成功');
          //     this.fetchBillList();
          //   }
          // });

          // 模拟操作成功
          row.isSent = true;
          this.$message.success('账单发送成功');
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    // 格式化日期为 yy-mm-dd
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date
        .getFullYear()
        .toString()
        .substr(2); // 获取年份后两位
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  created() {
    this.fetchBillList();
  }
};
</script>

<style lang="scss" scoped>
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
.table-container .fee-title {
  font-size: 14px;
  font-weight: bold;
  color: #5b5d5f;
  margin-bottom: 10px;
  margin-left: 10px;
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
</style>
