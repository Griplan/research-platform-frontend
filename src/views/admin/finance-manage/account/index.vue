<template>
  <div class="app-container">
    <div class="finance-content">
      <div class="header-container">
        <h2>账户管理</h2>
        <div class="button-container">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-circle-plus"
            @click="handleAddDialogOpen"
            >新增</el-button
          >
          <el-button type="primary" size="mini" icon="el-icon-search">查找</el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table
          :data="accountRecords"
          :header-cell-style="{ background: '#fafafa', padding: '2px 0' }"
          v-loading="accountLoading"
          :cell-style="{ padding: '2px 0' }"
          size="mini"
          border
        >
          <el-table-column prop="id" label="账户编号" width="120" />
          <el-table-column prop="name" label="账户名称" />
          <el-table-column prop="debt_amount" label="可透支额度" width="120" sortable />
          <el-table-column prop="inter_amount" label="账户余额" width="120" sortable />
          <el-table-column prop="frozen_amount" label="冻结金额" width="120" sortable />
          <el-table-column prop="amount" label="可消费总额" width="120" />
          <el-table-column prop="creator_name" label="所属会员" width="120" />
          <el-table-column prop="created_at" label="创建时间" width="120">
            <template slot-scope="scope">
              {{ formatDate(scope.row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="账户修改日期" width="120">
            <template slot-scope="scope">
              {{ formatDate(scope.row.updated_at) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态标识" width="80">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.status === '1'
                    ? 'success'
                    : scope.row.status === '0'
                    ? 'danger'
                    : 'warning'
                "
                >{{ scope.row.status === '1' ? '有效' : '无效' }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="禁用" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" disabled icon="el-icon-circle-close"
                >禁用</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleAccountSizeChange"
          @current-change="handleAccountCurrentChange"
          :current-page="accountQuery.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="accountQuery.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="accountTotal"
          background
        ></el-pagination>
      </div>
      <div class="table-footer">
        <div class="export-buttons">
          <el-button type="success" size="mini" icon="el-icon-download">导出当前页</el-button>
          <el-button type="warning" size="mini" icon="el-icon-download">导出所有</el-button>
        </div>
      </div>
    </div>

    <!-- 编辑账户对话框 -->
    <edit-account
      v-if="editDialogVisible"
      :account-data="currentAccount"
      @submit="handleSubmit"
      @close="handleDialogClose"
    />
    <!-- 新建 -->
    <add-account v-if="addDialogVisible" @close="handleAddDialogClose" />
  </div>
</template>

<script>
import EditAccount from './components/editAccount.vue';
import AddAccount from './components/addAccount.vue';
import { allAccount } from '@/api/finance';

export default {
  name: 'AccountManage',
  components: {
    EditAccount,
    AddAccount
  },
  data() {
    return {
      // 账户数据
      accountLoading: false,
      accountTotal: 0, // 总条数
      accountQuery: {
        page: 1, // 当前页码
        size: 10 // 每页条数
      },
      // 对话框控制
      editDialogVisible: false,
      addDialogVisible: false,
      currentAccount: {},
      accountRecords: []
    };
  },
  methods: {
    // 账户分页方法
    handleAccountSizeChange(val) {
      this.accountQuery.size = val;
      this.fetchAccountRecords();
    },
    handleAccountCurrentChange(val) {
      this.accountQuery.page = val;
      this.fetchAccountRecords();
    },

    // 获取账户记录
    fetchAccountRecords() {
      this.accountLoading = true;
      allAccount(this.accountQuery)
        .then(res => {
          if (res.status === 200) {
            this.accountRecords = res.data.data;
            this.accountTotal = res.data.total;
          }
        })
        .finally(() => {
          this.accountLoading = false;
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
    },

    // 处理编辑按钮点击
    handleEdit(row) {
      this.currentAccount = JSON.parse(JSON.stringify(row));
      this.editDialogVisible = true;
    },

    // 处理对话框关闭
    handleDialogClose() {
      this.currentAccount = {};
      this.editDialogVisible = false;
    },

    // 处理新建对话框关闭
    handleAddDialogClose() {
      this.addDialogVisible = false;
    },

    // 处理新增对话框打开
    handleAddDialogOpen() {
      this.addDialogVisible = true;
    }
  },
  created() {
    this.fetchAccountRecords();
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 10px 30px;
}
h1 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
.table-footer {
  margin-top: 15px;
  margin-bottom: 15px;

  .export-buttons {
    display: flex;
    gap: 10px;
  }
}

h2 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.finance-content {
  display: flex;
  flex-direction: column;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-container {
      display: flex;
      gap: 10px;
    }
  }

  .table-container {
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
}
</style>
