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
            <el-image v-if="scope.row.invoice" style="width: 30px; height: 30px"> </el-image>
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
              <template v-if="scope.row.status === 0">
                <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button type="warning" size="mini" @click="handleIn(scope.row)">
                  入账
                </el-button>
              </template>
              <template v-if="scope.row.status === 1">
                <el-button type="warning" size="mini" @click="handleCancel(scope.row)">
                  取消入账
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

      <!-- 新增付款记录 -->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="addDialogVisible"
        width="40%"
        v-loading="loading"
      >
        <el-form :model="form" :rules="rules" ref="form" label-width="160px">
          <el-form-item label="账户编号" prop="research_group_account_id">
            <el-input
              v-model="form.research_group_account_id"
              placeholder="请输入账户编号"
              size="mini"
              class="keep-25"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="金额" prop="amount">
            <el-input v-model="form.amount" placeholder="请输入金额" size="mini" class="keep-25">
            </el-input>
          </el-form-item>
          <el-form-item label="支付方式" prop="pay_type">
            <el-input
              v-model="form.pay_type"
              placeholder="请选择支付方式"
              size="mini"
              class="keep-25"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="发票下载地址" prop="invoice_download_address">
            <el-input
              v-model="form.invoice_download_address"
              placeholder="请输入金额"
              size="mini"
              class="keep-25"
            ></el-input>
          </el-form-item>
          <el-form-item label="发票日期" prop="invoice_date">
            <el-date-picker v-model="form.invoice_date" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发票图片附件" prop="invoice">
            <el-input
              v-model="form.invoice"
              placeholder="请输入发票图片附件"
              size="mini"
              class="keep-25"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入备注"
              size="mini"
              class="keep-25"
            ></el-input>
          </el-form-item>
          <el-form-item
            ><el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
            <el-button @click="closeAddDialog" size="mini">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPaymentRecord,
  addPaymentRecord,
  editPaymentRecord,
  inPayRecord,
  cancelInPayRecord
} from '@/api/finance';
import { uploadUrl } from '@/api/public';
export default {
  name: 'PayRecord',
  data() {
    return {
      loading: false,
      uploadUrl: uploadUrl,
      fileList: [],
      recordList: [],
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 3,
      addDialogVisible: false,
      isEdit: false,
      form: {
        research_group_account_id: '',
        amount: '',
        pay_type: '',
        remark: '',
        invoice_download_address: '',
        invoice_date: '',
        invoice: ''
      },
      rules: {
        research_group_account_id: [
          { required: true, message: '请输入账户编号', trigger: 'blur' },
          {
            type: 'number',
            message: '账户编号必须为数字',
            trigger: 'blur',
            transform: value => Number(value)
          }
        ],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          {
            type: 'number',
            message: '金额必须为数字',
            trigger: 'blur',
            transform: value => Number(value)
          }
        ],
        pay_type: [{ required: true, message: '请输入支付方式', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        invoice_download_address: [
          { required: true, message: '请输入发票下载地址', trigger: 'blur' }
        ],
        invoice_date: [{ required: true, message: '请选择发票日期', trigger: 'blur' }],
        invoice: [{ required: true, message: '请输入发票图片附件', trigger: 'blur' }]
      }
    };
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑付款记录' : '新增付款记录';
    }
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
      this.isEdit = true;
      this.addDialogVisible = true;
      this.form = {
        ...row,
        invoice_date: row.invoice_date ? new Date(row.invoice_date) : ''
      };
    },
    // 处理入账
    handleIn(row) {
      this.$confirm('确认入账该付款记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          inPayRecord(row.id).then(res => {
            if (res.status === 1) {
              this.$message.success('付款记录已入账');
              this.fetchRecordList();
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    // 处理取消
    handleCancel(row) {
      this.$confirm('确认取消入账该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cancelInPayRecord(row.id).then(res => {
            if (res.status === 1) {
              this.$message.success('付款记录已取消入账');
              this.fetchRecordList();
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消操作');
        });
    },
    // 新增付款记录
    handleAdd() {
      this.isEdit = false;
      this.addDialogVisible = true;
      this.form = {
        research_group_account_id: '',
        amount: '',
        pay_type: '',
        remark: '',
        invoice_download_address: '',
        invoice_date: '',
        invoice: ''
      };
    },
    closeAddDialog() {
      this.addDialogVisible = false;
      this.$refs.form.resetFields();
    },
    // 格式化日期时间
    formatDateTime(date) {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    submitForm() {
      console.log(this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          const submitData = {
            ...this.form,
            invoice_date: this.formatDateTime(this.form.invoice_date)
          };
          const request = this.isEdit
            ? editPaymentRecord(submitData)
            : addPaymentRecord(submitData);
          request
            .then(res => {
              if (res.status === 1) {
                this.$message.success(this.isEdit ? '编辑成功' : '添加成功');
                this.fetchRecordList();
                this.addDialogVisible = false;
              }
            })
            .catch(err => {
              this.$message.error(err.msg);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$message.error('请填写完整的表单信息');
          return false;
        }
      });
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
