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
      <el-form-item label="账户编号" prop="account">
        <el-select v-model="form.account" placeholder="请选择账户" filterable class="keep-40">
          <el-option
            v-for="item in accountOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model="form.amount" placeholder="请输入退款金额" class="keep-40"></el-input>
      </el-form-item>
      <el-form-item label="退款日期" prop="refundDate">
        <el-date-picker
          v-model="form.refundDate"
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
        <el-button type="primary" @click="handleSubmit" :loading="loading">保 存 </el-button>
        <el-button @click="handleClose">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddRefundRecord',
  data() {
    return {
      loading: false,
      form: {
        account: '',
        amount: 0,
        refundDate: '',
        remark: ''
      },
      rules: {
        account: [{ required: true, message: '请选择账户', trigger: 'change' }],
        amount: [{ required: true, message: '请输入退款金额', trigger: 'blur' }],
        refundDate: [{ required: true, message: '请选择退款日期', trigger: 'change' }]
      },
      accountOptions: [
        { value: 'ACC-001', label: '科研中心账户-1001' },
        { value: 'ACC-002', label: '实验室账户-2002' },
        { value: 'ACC-003', label: '动物中心-3003' }
      ]
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

          // 构建提交的数据
          const submitData = {
            ...this.form,
            status: 2 // 2: 待退款
          };

          // 模拟API调用
          setTimeout(() => {
            this.loading = false;

            // 这里是实际的API调用
            // this.$api.finance.addRefundRecord(submitData).then(res => {
            //   if (res.code === 200) {
            //     this.$message.success('退款记录创建成功');
            //     this.$emit('success');
            //     this.handleClose();
            //   }
            // }).finally(() => {
            //   this.loading = false;
            // });

            this.$message.success('退款记录创建成功');
            this.$emit('success');
            this.handleClose();
          }, 1000);
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
