<template>
  <div>
    <div class="header-container">
      <h4>消费账单汇总</h4>
      <div class="button-container">
        <el-button type="warning" size="mini" icon="el-icon-position">发送账单</el-button>
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
      <el-table
        :data="billList"
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="id" label="汇总编号" width="90" />
        <el-table-column prop="name" label="账单标题" width="140" />
        <el-table-column prop="start_time" label="开始日期" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.start_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="year" label="统计年份" width="90" />
        <el-table-column prop="quarter" label="统计季度" width="90" />
        <el-table-column prop="month" label="统计月份" width="90" />
        <el-table-column prop="animal_cost" label="动物费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.animal_cost }}
          </template>
        </el-table-column>
        <el-table-column prop="care_cost" label="饲养费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.care_cost }}
          </template>
        </el-table-column>
        <el-table-column prop="access_cost" label="进出费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.access_cost }}
          </template>
        </el-table-column>
        <el-table-column prop="overtime_cost" label="加班费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.overtime_cost }}
          </template>
        </el-table-column>
        <el-table-column prop="tech_cost" label="技术服务费" sortable width="110">
          <template slot-scope="scope">
            {{ scope.row.tech_cost }}
          </template>
        </el-table-column>
        <el-table-column prop="extra_cost" label="其他费用" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.extra_cost }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="isConfirmed" label="账单已确认" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isConfirmed ? 'success' : 'info'">
              {{ scope.row.isConfirmed ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="确认账单" width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="scope.row.isConfirmed"
              @click="confirmBill(scope.row)"
            >
              确认
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="isSent" label="账单已发送" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isSent ? 'success' : 'info'">
              {{ scope.row.isSent ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发送账单" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              :disabled="!scope.row.isConfirmed || scope.row.isSent"
              @click="sendBill(scope.row)"
            >
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
import { getConsumeBill } from '@/api/finance';
export default {
  name: 'ConsumeBill',
  components: {
    GenerateBillDialog
  },
  data() {
    return {
      loading: false,
      generateDialogVisible: false,
      billList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 3
    };
  },
  methods: {
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
      getConsumeBill(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.billList = res.data.records;
            console.log(this.billList);
            this.total = res.data.total;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showGenerateDialog() {
      this.generateDialogVisible = true;
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
