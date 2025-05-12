<template>
  <div>
    <div class="header-container">
      <h4>消费账单汇总</h4>
      <div class="button-container">
        <el-button size="mini" type="warning" icon="el-icon-edit-outline">入账所有账单</el-button>
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
        <el-table-column prop="id" label="账单编号" width="90" />
        <el-table-column prop="type" label="账单类型" width="100" />
        <el-table-column prop="title" label="账单标题" />
        <el-table-column prop="centerId" label="中心编号" width="140" />
        <el-table-column prop="startDate" label="开始日期" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.startDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="截止日期" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.endDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="year" label="统计年份" width="90" />
        <el-table-column prop="quarter" label="统计季度" width="90" />
        <el-table-column prop="month" label="统计月份" width="90" />
        <el-table-column prop="amount" label="金额" sortable width="120">
          <template slot-scope="scope">
            {{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160">
          <template slot-scope="scope">
            {{ formatDateTime(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="isRecorded" label="是否已入账" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isRecorded ? 'success' : 'info'">
              {{ scope.row.isRecorded ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="入账操作员" width="120" />
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
</template>

<script>
export default {
  name: 'AnimalBill',
  data() {
    return {
      loading: false,
      billList: [
        {
          id: 'BL001',
          type: '动物账单',
          title: '2023年第一季度账单',
          startDate: '2023-01-01',
          endDate: '2023-03-31',
          year: '2023',
          quarter: 'Q1',
          centerId: '总成本中心',
          month: '1-3',
          amount: 12500.0,
          createTime: '2023-04-05 09:25:30',
          isRecorded: true,
          operator: '张三'
        },
        {
          id: 'BL002',
          type: '动物账单',
          title: '2023年第二季度账单',
          startDate: '2023-04-01',
          endDate: '2023-06-30',
          year: '2023',
          centerId: '总成本中心',
          quarter: 'Q2',
          month: '4-6',
          amount: 13600.0,
          createTime: '2023-07-05 10:15:20',
          isRecorded: true,
          operator: '李四'
        },
        {
          id: 'BL003',
          type: '动物账单',
          title: '2023年第三季度账单',
          startDate: '2023-07-01',
          endDate: '2023-09-30',
          year: '2023',
          centerId: '总成本中心',
          quarter: 'Q3',
          month: '7-9',
          amount: 14800.0,
          createTime: '2023-10-05 14:30:45',
          isRecorded: false,
          operator: ''
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
    // 格式化日期时间为 yyyy-mm-dd HH:MM:SS
    formatDateTime(dateTimeString) {
      if (!dateTimeString) return '';
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
      const hours = date
        .getHours()
        .toString()
        .padStart(2, '0');
      const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, '0');
      const seconds = date
        .getSeconds()
        .toString()
        .padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
