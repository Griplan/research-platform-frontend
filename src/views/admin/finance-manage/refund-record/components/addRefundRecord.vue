<template>
  <el-dialog
    title="新建退款记录"
    :visible="true"
    width="40%"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="refundForm"
      label-width="100px"
      :validate-on-rule-change="false"
      size="small"
    >
      <el-form-item label="账户编号" prop="research_group_account_id">
        <el-input
          v-model="form.research_group_account_id"
          placeholder="请输入账户编号"
          class="keep-40"
        ></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model="form.amount" placeholder="请输入退款金额" class="keep-40"></el-input>
      </el-form-item>
      <el-form-item label="退款日期" prop="refund_time">
        <el-date-picker
          v-model="form.refund_time"
          type="date"
          placeholder="选择退款日期"
          value-format="yyyy-MM-dd"
          class="keep-40"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          v-model="form.remark"
          placeholder="请输入退款备注信息"
          :rows="3"
          class="keep-70"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">确 认 </el-button>
        <el-button @click="handleClose">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRefundRecord } from '@/api/finance';
export default {
  name: 'AddRefundRecord',
  data() {
    return {
      loading: false,
      form: {
        research_group_id: '',
        amount: 0,
        refund_time: '',
        remark: ''
      },
      rules: {
        research_group_account_id: [{ required: true, message: '请输入账户编号', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入退款金额', trigger: 'blur' }],
        refund_time: [{ required: true, message: '请选择退款日期', trigger: 'change' }],
        remark: [{ required: true, message: '请输入退款备注信息', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.refundForm.resetFields();
      this.$emit('close');
    },
    handleSubmit() {
      this.$refs.refundForm.validate(valid => {
        if (valid) {
          this.loading = true;
          addRefundRecord(this.form)
            .then(res => {
              if (res.status === 1) {
                this.$message.success('退款记录创建成功');
                this.$emit('success');
                this.handleClose();
              } else {
                this.$message.error(res.msg);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.keep-40 {
  width: 40%;
}
.keep-70 {
  width: 70%;
}
</style>
