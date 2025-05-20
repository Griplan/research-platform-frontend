<template>
  <div class="app-container">
    <div class="header-container">
      <h4>付款记录</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-plus" type="warning" @click="handleAdd"
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
        <el-table-column prop="id" label="付款记录编号" width="110" />
        <el-table-column prop="research_group_account_id" label="账户编号" width="100" />
        <el-table-column prop="handler" label="经手人" width="90">
          <template slot-scope="scope">
            {{ scope.row.handler ? scope.row.handler : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" sortable width="100">
          <template slot-scope="scope">
            {{ scope.row.amount.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="pay_type" label="支付方式" width="90" />
        <el-table-column prop="invoice_download_address" label="发票下载地址" width="120">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :href="scope.row.invoice_download_address"
              target="_blank"
              :underline="false"
              v-if="scope.row.invoice_download_address"
            >
              <i class="el-icon-download"></i> 下载
            </el-link>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoice_date" label="发票日期" width="100">
          <template slot-scope="scope">
            {{ scope.row.invoice_date ? formatDate(scope.row.invoice_date) : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="invoice" label="发票图片附件" width="120">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.invoice"
              style="width: 30px; height: 30px"
              :src="scope.row.invoice"
              :preview-src-list="[scope.row.invoice]"
            >
            </el-image>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="received_time" label="到账时间" width="110">
          <template slot-scope="scope">
            {{ scope.row.received_time ? formatDate(scope.row.received_time) : '无' }}
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
        <el-table-column prop="create_time" label="创建时间" width="100">
          <template slot-scope="scope">
            {{ scope.row.create_time ? formatDate(scope.row.create_time) : '无' }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="150">
          <template slot-scope="scope">
            {{ scope.row.create_by }}
          </template>
        </el-table-column>
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
        :current-page="pagination.pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>

      <!-- 新增付款记录 -->
      <el-dialog title="新增付款记录" :visible.sync="addDialogVisible" width="50%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="账户编号">
            <el-input
              v-model="form.research_group_account_id"
              placeholder="请输入账户编号"
              size="mini"
              class="keep-25"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="form.amount" placeholder="请输入金额" size="mini" class="keep-25">
            </el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-input
              v-model="form.pay_type"
              placeholder="请选择支付方式"
              size="mini"
              class="keep-25"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="发票下载地址">
            <el-input
              v-model="form.invoice_download_address"
              placeholder="请输入金额"
              size="mini"
              class="keep-25"
            ></el-input>
          </el-form-item>
          <el-form-item label="发票日期">
            <el-date-picker v-model="form.invoice_date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发票图片附件">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注"
            ><el-input
              v-model="form.remark"
              placeholder="请输入金额"
              size="mini"
              class="keep-25"
            ></el-input
          ></el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPaymentRecord } from '@/api/finance';
export default {
  name: 'PayRecord',
  data() {
    return {
      loading: false,
      recordList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 3,
      addDialogVisible: false,
      form: {
        id: '',
        research_group_account_id: '',
        handler: '',
        amount: '',
        pay_type: '',
        invoice_download_address: ''
      }
    };
  },
  methods: {
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
      getPaymentRecord(this.pagination)
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
    },
    // 新增付款记录
    handleAdd() {
      this.addDialogVisible = true;
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
.keep-25 {
  width: 25%;
}
</style>
