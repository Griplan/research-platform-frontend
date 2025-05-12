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
        <el-button type="primary" size="mini" icon="el-icon-search">查找</el-button>
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
        <el-table-column prop="title" label="账单标题" width="140" />
        <el-table-column prop="startDate" label="开始日期" width="100" />
        <el-table-column prop="year" label="统计年份" width="90" />
        <el-table-column prop="quarter" label="统计季度" width="90" />
        <el-table-column prop="month" label="统计月份" width="90" />
        <el-table-column prop="animalFee" label="动物费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.animalFee.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="breedingFee" label="饲养费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.breedingFee.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="inOutFee" label="进出费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.inOutFee.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="overtimeFee" label="加班费" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.overtimeFee.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="serviceFee" label="技术服务费" sortable width="110">
          <template slot-scope="scope">
            {{ scope.row.serviceFee.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="otherFee" label="其他费用" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.otherFee.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="100" />
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
        :current-page="pagination.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.size"
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
export default {
  name: 'ConsumeBill',
  components: {
    GenerateBillDialog
  },
  data() {
    return {
      loading: false,
      generateDialogVisible: false,
      billList: [
        {
          id: 'BL001',
          title: '2023年第一季度账单',
          startDate: '2023-01-01',
          year: '2023',
          quarter: 'Q1',
          month: '1-3',
          animalFee: 12500.0,
          breedingFee: 8750.5,
          inOutFee: 4300.25,
          overtimeFee: 2150.0,
          serviceFee: 9800.75,
          otherFee: 1500.0,
          createTime: '2023-04-05',
          isConfirmed: true,
          isSent: true
        },
        {
          id: 'BL002',
          title: '2023年第二季度账单',
          startDate: '2023-04-01',
          year: '2023',
          quarter: 'Q2',
          month: '4-6',
          animalFee: 13600.0,
          breedingFee: 9200.5,
          inOutFee: 5100.25,
          overtimeFee: 2650.0,
          serviceFee: 10500.75,
          otherFee: 1800.0,
          createTime: '2023-07-05',
          isConfirmed: true,
          isSent: false
        },
        {
          id: 'BL003',
          title: '2023年第三季度账单',
          startDate: '2023-07-01',
          year: '2023',
          quarter: 'Q3',
          month: '7-9',
          animalFee: 14800.0,
          breedingFee: 9600.5,
          inOutFee: 5400.25,
          overtimeFee: 2800.0,
          serviceFee: 11200.75,
          otherFee: 2100.0,
          createTime: '2023-10-05',
          isConfirmed: false,
          isSent: false
        }
      ],
      pagination: {
        page: 1,
        size: 10
      },
      total: 3
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.size = val;
      this.fetchBillList();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchBillList();
    },
    fetchBillList() {
      this.loading = true;
      // 这里应该是实际的API调用，获取账单列表数据
      // this.$api.finance.getBillList(this.pagination).then(res => {
      //   this.billList = res.data.records;
      //   this.total = res.data.total;
      // }).finally(() => {
      //   this.loading = false;
      // });

      // 模拟数据加载
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    showGenerateDialog() {
      this.generateDialogVisible = true;
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
