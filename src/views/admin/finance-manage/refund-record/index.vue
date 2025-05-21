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
        <el-table-column prop="refund_time" label="退款日期" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.refund_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="research_group_account_id" label="账户" width="120" />
        <el-table-column prop="amount" label="金额" sortable width="120">
          <template slot-scope="scope">
            {{ scope.row.amount }}
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
        <el-table-column prop="create_time" label="创建时间" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="create_by" label="创建人" width="100" />
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <div class="button-container">
              <template v-if="scope.row.status === 0">
                <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button type="warning" size="mini" @click="handleIn(scope.row)">
                  入账
                </el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
                  删除
                </el-button>
              </template>
              <template v-if="scope.row.status === 1">
                <el-button type="warning" size="mini" @click="handleCancel(scope.row)">
                  取消入账
                </el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
                  删除
                </el-button>
              </template>
            </div>
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

    <!-- 添加退款记录对话框 -->
    <add-refund-record v-if="showDialog" @close="hideAddDialog" @success="handleAddSuccess" />
    <!-- 编辑退款记录对话框 -->
    <edit-refund-record
      v-if="showEditDialog"
      @close="hideEditDialog"
      @success="handleEditSuccess"
    />
  </div>
</template>

<script>
import AddRefundRecord from './components/addRefundRecord.vue';
import EditRefundRecord from './components/editRefundRecord.vue';
import {
  allRefundRecord,
  inRefundRecord,
  deleteRefundRecord,
  cancelInRefundRecord
} from '@/api/finance';
export default {
  name: 'RefundRecord',
  components: {
    AddRefundRecord,
    EditRefundRecord
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      showEditDialog: false,
      recordList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10
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
      this.pagination.pageSize = val;
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchRecordList();
    },
    fetchRecordList() {
      this.loading = true;
      allRefundRecord(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.recordList = res.data.records;
            this.total = res.data.total;
          }
        })
        .finally(() => {
          this.loading = false;
        });
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
        case 0:
          return 'warning';
      }
    },
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 1:
          return '已入账';
        case 0:
          return '未入账';
      }
    },
    // 处理编辑
    handleEdit(row) {
      this.showEditDialog = true;
      this.editRow = row;
    },
    // 隐藏编辑对话框
    hideEditDialog() {
      this.showEditDialog = false;
    },
    // 处理入账
    handleIn(row) {
      this.$confirm('确认入账该退款记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        inRefundRecord({ id: row.id })
          .then(res => {
            if (res.status === 1) {
              this.$message.success('退款记录已入账');
              this.fetchRecordList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    // 处理删除
    handleDelete(row) {
      this.$confirm('确认删除该退款记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        deleteRefundRecord({ id: row.id })
          .then(res => {
            if (res.status === 1) {
              this.$message.success('退款记录已删除');
              this.fetchRecordList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    // 处理取消
    handleCancel(row) {
      this.$confirm('确认取消该退款记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        cancelInRefundRecord({ id: row.id })
          .then(res => {
            if (res.status === 1) {
              this.$message.success('退款记录已取消');
              this.fetchRecordList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .finally(() => {
            this.loading = false;
          });
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
