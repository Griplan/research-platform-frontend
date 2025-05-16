<template>
  <div>
    <div class="header-container">
      <h4>动物账单汇总</h4>
      <div class="button-container">
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
        <el-table-column prop="bill_type" label="账单类型" width="100" />
        <el-table-column prop="name" label="账单标题" />
        <el-table-column prop="start_time" label="开始日期" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.start_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="截止日期" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.end_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="year" label="统计年份" width="90" />
        <el-table-column prop="quarter" label="统计季度" width="90" />
        <el-table-column prop="month" label="统计月份" width="90" />
        <el-table-column prop="amount" label="金额" sortable width="120">
          <template slot-scope="scope">
            {{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160">
          <template slot-scope="scope">
            {{ formatDate(scope.row.create_time) }}
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
        :current-page="pagination.pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getClassifiedBill } from '@/api/finance';
export default {
  name: 'AnimalBill',
  data() {
    return {
      loading: false,
      billList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        billType: '动物账单'
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
