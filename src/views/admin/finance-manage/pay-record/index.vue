<template>
  <div class="app-container">
    <div class="header-container">
      <h4>付款记录</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-plus" type="warning">新增</el-button>
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
        <el-table-column prop="id" label="付款记录编号" width="110" />
        <el-table-column prop="accountId" label="账户编号" width="100" />
        <el-table-column prop="handler" label="经手人" width="90" />
        <el-table-column prop="amount" label="金额" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="payMethod" label="支付方式" width="90" />
        <el-table-column prop="invoiceUrl" label="发票下载地址" width="120">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="scope.row.invoiceUrl"
              target="_blank"
              :underline="false"
              v-if="scope.row.invoiceUrl"
            >
              <i class="el-icon-download"></i> 下载
            </el-link>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceDate" label="发票日期" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.invoiceDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="invoiceImg" label="发票图片附件" width="120">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.invoiceImg"
              style="width: 30px; height: 30px"
              :src="scope.row.invoiceImg"
              :preview-src-list="[scope.row.invoiceImg]"
            >
            </el-image>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="receivedTime" label="到账时间" width="110">
          <template slot-scope="scope">
            {{ formatDate(scope.row.receivedTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column prop="status" label="状态标识" width="90">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="100">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="90" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <div class="button-container">
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
            </div>
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
  name: 'PayRecord',
  data() {
    return {
      loading: false,
      recordList: [
        {
          id: 'PAY20230001',
          accountId: 'ACC001',
          handler: '张三',
          amount: 12500.0,
          payMethod: '银行转账',
          invoiceUrl: 'https://example.com/invoice/001.pdf',
          invoiceDate: '2023-04-01',
          invoiceImg: 'https://example.com/invoice/001.jpg',
          receivedTime: '2023-04-05',
          remark: '第一季度账单付款',
          status: 1, // 1: 已付款, 2: 待付款, 3: 已取消
          createTime: '2023-03-30',
          creator: '李四'
        },
        {
          id: 'PAY20230002',
          accountId: 'ACC002',
          handler: '王五',
          amount: 8600.0,
          payMethod: '支付宝',
          invoiceUrl: '',
          invoiceDate: '',
          invoiceImg: '',
          receivedTime: '2023-07-08',
          remark: '二季度设备费',
          status: 1, // 1: 已付款, 2: 待付款, 3: 已取消
          createTime: '2023-07-05',
          creator: '赵六'
        },
        {
          id: 'PAY20230003',
          accountId: 'ACC003',
          handler: '钱七',
          amount: 15800.0,
          payMethod: '微信支付',
          invoiceUrl: 'https://example.com/invoice/003.pdf',
          invoiceDate: '2023-10-02',
          invoiceImg: 'https://example.com/invoice/003.jpg',
          receivedTime: '',
          remark: '三季度运营费用',
          status: 2, // 1: 已付款, 2: 待付款, 3: 已取消
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
      // 这里应该是实际的API调用，获取付款记录列表数据
      // this.$api.finance.getPayRecordList(this.pagination).then(res => {
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
          return '已付款';
        case 2:
          return '待付款';
        case 3:
          return '已取消';
        default:
          return '未知';
      }
    },
    // 处理编辑
    handleEdit(row) {
      this.$message.info(`编辑付款记录：${row.id}`);
      // 这里应该跳转到编辑页面或打开编辑对话框
      // this.$router.push(`/finance-manage/pay-record/edit/${row.id}`);
    },
    // 处理取消
    handleCancel(row) {
      this.$confirm('确认取消该付款记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 这里应该是实际的API调用，取消付款记录
          // this.$api.finance.cancelPayRecord(row.id).then(res => {
          //   if (res.code === 200) {
          //     this.$message.success('付款记录已取消');
          //     this.fetchRecordList();
          //   }
          // });

          // 模拟操作成功
          row.status = 3; // 设置为已取消
          this.$message.success('付款记录已取消');
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    // 判断是否可以编辑
    canEdit(row) {
      return row.status === 2; // 只有待付款状态可以编辑
    },
    // 判断是否可以取消
    canCancel(row) {
      return row.status === 2; // 只有待付款状态可以取消
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
.button-container {
  display: flex;
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
