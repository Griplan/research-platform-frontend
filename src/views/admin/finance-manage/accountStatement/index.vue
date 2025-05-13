<template>
  <div class="app-container">
    <div class="header-container">
      <h4>账目流水</h4>
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
        <el-table-column prop="id" label="流水编号" width="120" />
        <el-table-column prop="handler" label="经手人" width="100" />
        <el-table-column prop="accountId" label="账户编号" width="120" />
        <el-table-column prop="remark" label="备注" min-width="150" />
        <el-table-column prop="amount" label="金额" sortable width="120">
          <template slot-scope="scope">
            {{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="账户余额" width="120">
          <template slot-scope="scope">
            {{ scope.row.balance.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
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
</template>

<script>
export default {
  name: 'AccountStatement',
  components: {},
  data() {
    return {
      loading: false,
      recordList: [
        {
          id: 'FL20230001',
          handler: '张三',
          accountId: 'ACC001',
          amount: 5000.0,
          balance: 15000.0,
          remark: '项目资金入账',
          createTime: '2023-04-05'
        },
        {
          id: 'FL20230002',
          handler: '李四',
          accountId: 'ACC002',
          amount: -3250.0,
          balance: 8750.0,
          remark: '实验材料采购支出',
          createTime: '2023-07-10'
        },
        {
          id: 'FL20230003',
          handler: '王五',
          accountId: 'ACC003',
          amount: 8760.0,
          balance: 18500.0,
          remark: '科研经费追加',
          createTime: '2023-10-01'
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
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchRecordList();
    },
    fetchRecordList() {
      this.loading = true;
      // 这里应该是实际的API调用，获取账户流水记录数据
      // this.$api.finance.getAccountStatementList(this.pagination).then(res => {
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
    // 格式化日期为 yyyy-mm-dd
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    // 处理编辑
    handleEdit(row) {
      this.$message.info(`编辑流水记录：${row.id}`);
      // 这里应该跳转到编辑页面或打开编辑对话框
      // this.$router.push(`/finance-manage/account-statement/edit/${row.id}`);
    }
  },
  created() {
    this.fetchRecordList();
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
