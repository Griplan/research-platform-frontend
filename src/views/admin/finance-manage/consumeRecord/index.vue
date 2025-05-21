<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="全部" name="first"> </el-tab-pane>
      <el-tab-pane label="动物费" name="second"> </el-tab-pane>
      <el-tab-pane label="饲养费" name="third"> </el-tab-pane>
      <el-tab-pane label="技术服务费" name="fourth"> </el-tab-pane>
      <el-tab-pane label="加班费" name="fifth"> </el-tab-pane>
      <el-tab-pane label="设施使用费" name="sixth"> </el-tab-pane>
      <!-- <el-tab-pane label="预约使用费" name="seventh"> </el-tab-pane> -->
      <el-tab-pane label="其他" name="eighth"> </el-tab-pane>
      <div>
        <div class="header-container">
          <h4>消费记录</h4>
          <div class="button-container">
            <!-- <el-button size="mini" icon="el-icon-plus" type="warning" @click="handleAdd"
              >新增</el-button
            > -->
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
            <el-table-column prop="purchase_time" label="消费日期" width="100">
              <template slot-scope="scope">
                {{ formatDate(scope.row.purchase_time) }}
              </template>
            </el-table-column>
            <el-table-column prop="research_group_account_id" label="账户编号" width="100" />
            <el-table-column prop="update_by" label="经手人" width="90" />
            <el-table-column prop="amount" label="金额" sortable width="90">
              <template slot-scope="scope">
                {{ scope.row.amount.toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="cost_classification" label="费用类别" width="100" />
            <el-table-column prop="settlement_method" label="结算方式" width="100" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="status" label="状态标识" width="90">
              <template slot-scope="scope">
                <el-tag :type="getStatusType(scope.row.status)">
                  {{ getStatusText(scope.row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="100">
              <template slot-scope="scope">
                {{ formatDate(scope.row.create_time) }}
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="创建人" width="90" />
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                  编辑
                </el-button> -->
                <el-button type="danger" size="mini" @click="handleCancel(scope.row)">
                  删除
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
    </el-tabs>
    <add-dialog
      v-if="addDialogVisible"
      :loading="loading"
      @submit="handleSubmitAdd"
      @close="handleCloseAddDialog"
    />
  </div>
</template>

<script>
import { getConsumeRecord, deleteConsumeRecord } from '@/api/finance';
import AddDialog from './components/AddDialog.vue';

export default {
  components: {
    AddDialog
  },
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
      addDialogVisible: false
    };
  },
  methods: {
    handleClick(tab, event) {
      let type = tab.name;
      switch (type) {
        case 'first':
          this.pagination.cost_classification = '';
          break;
        case 'second':
          this.pagination.cost_classification = '动物费';
          break;
        case 'third':
          this.pagination.cost_classification = '饲养费';
          break;
        case 'fourth':
          this.pagination.cost_classification = '技术服务费';
          break;
        case 'fifth':
          this.pagination.cost_classification = '加班费';
          break;
        case 'sixth':
          this.pagination.cost_classification = '设施使用费';
          break;
        case 'eighth':
          this.pagination.cost_classification = '其他';
          break;
        default:
          this.pagination.cost_classification = '';
      }
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
      getConsumeRecord(this.pagination).then(res => {
        if (res.status == 1) {
          this.recordList = res.data.records;
          this.total = res.data.total;
        }
        this.loading = false;
      });
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
          return '已结算';
        case 0:
          return '待结算';
      }
    },
    // 处理编辑
    handleEdit(row) {
      this.$message.info(`编辑消费记录：${row.id}`);
      // 这里应该跳转到编辑页面或打开编辑对话框
      // this.$router.push(`/finance-manage/consume-record/edit/${row.id}`);
    },
    // 处理取消
    handleCancel(row) {
      this.$confirm('确认取消该消费记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteConsumeRecord({ id: row.id }).then(res => {
            if (res.status == 1) {
              this.$message.success('删除成功');
              this.fetchRecordList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消操作');
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
    },
    handleAdd() {
      this.addDialogVisible = true;
    },
    handleSubmitAdd(formData) {
      this.loading = true;
      // 这里添加提交表单的逻辑
      console.log('提交的表单数据:', formData);
      this.addDialogVisible = false;
      this.$message.success('添加成功');
      this.fetchRecordList();
    },
    handleCloseAddDialog() {
      this.addDialogVisible = false;
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
</style>
