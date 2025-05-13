<template>
  <div class="app-container">
    <div class="header-container">
      <h4>退款记录</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-plus" type="warning" @click="showAddDialog"
          >新增</el-button
        >
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
        <el-table-column prop="id" label="退款编号" width="120" />
        <el-table-column prop="refundDate" label="退款日期" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.refundDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="account" label="账户" width="120" />
        <el-table-column prop="amount" label="金额" sortable width="120">
          <template slot-scope="scope">
            {{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="status" label="状态标识" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="100" />
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
            <el-button
              type="danger"
              size="mini"
              @click="handleCancel(scope.row)"
              :disabled="!canCancel(scope.row)"
            >
              取消
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

    <!-- 添加退款记录对话框 -->
    <add-refund-record v-if="showDialog" @close="hideAddDialog" @success="handleAddSuccess" />
  </div>
</template>

<script>
import AddRefundRecord from './components/addRefundRecord.vue';

export default {
  name: 'RefundRecord',
  components: {
    AddRefundRecord
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      recordList: [
        {
          id: 'RF20230001',
          refundDate: '2023-04-10',
          account: '科研中心账户-1001',
          amount: 5000.0,
          remark: '项目取消退款',
          status: 1, // 1: 已退款, 2: 待退款, 3: 已取消
          createTime: '2023-04-05',
          creator: '李四'
        },
        {
          id: 'RF20230002',
          refundDate: '2023-07-15',
          account: '实验室账户-2002',
          amount: 3250.0,
          remark: '材料费多付退款',
          status: 1, // 1: 已退款, 2: 待退款, 3: 已取消
          createTime: '2023-07-10',
          creator: '赵六'
        },
        {
          id: 'RF20230003',
          refundDate: '',
          account: '动物中心-3003',
          amount: 8760.0,
          remark: '服务项目变更退款',
          status: 2, // 1: 已退款, 2: 待退款, 3: 已取消
          createTime: '2023-10-01',
          creator: '孙八'
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
    // 显示添加对话框
    showAddDialog() {
      this.showDialog = true;
    },
    // 隐藏添加对话框
    hideAddDialog() {
      this.showDialog = false;
    },
    // 添加成功处理
    handleAddSuccess() {
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
      // 这里应该是实际的API调用，获取退款记录列表数据
      // this.$api.finance.getRefundRecordList(this.pagination).then(res => {
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
          return '已退款';
        case 2:
          return '待退款';
        case 3:
          return '已取消';
        default:
          return '未知';
      }
    },
    // 处理编辑
    handleEdit(row) {
      this.$message.info(`编辑退款记录：${row.id}`);
      // 这里应该跳转到编辑页面或打开编辑对话框
      // this.$router.push(`/finance-manage/refund-record/edit/${row.id}`);
    },
    // 处理取消
    handleCancel(row) {
      this.$confirm('确认取消该退款记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 这里应该是实际的API调用，取消退款记录
          // this.$api.finance.cancelRefundRecord(row.id).then(res => {
          //   if (res.code === 200) {
          //     this.$message.success('退款记录已取消');
          //     this.fetchRecordList();
          //   }
          // });

          // 模拟操作成功
          row.status = 3; // 设置为已取消
          this.$message.success('退款记录已取消');
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    // 判断是否可以编辑
    canEdit(row) {
      return row.status === 2; // 只有待退款状态可以编辑
    },
    // 判断是否可以取消
    canCancel(row) {
      return row.status === 2; // 只有待退款状态可以取消
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
