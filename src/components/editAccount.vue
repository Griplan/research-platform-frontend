<template>
  <el-dialog
    title="编辑"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="rules" ref="accountForm" label-width="100px" size="small">
      <el-form-item label="所属会员" prop="memberName">
        <el-select v-model="form.memberName" placeholder="请选择所属会员" style="width: 100%">
          <el-option
            v-for="item in memberOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户类型" prop="accountType">
        <el-select v-model="form.accountType" placeholder="请选择账户类型" style="width: 100%">
          <el-option label="个人账户" value="personal"></el-option>
          <el-option label="企业账户" value="business"></el-option>
          <el-option label="部门账户" value="department"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户名称" prop="accountName">
        <el-input v-model="form.accountName" placeholder="请输入账户名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          rows="3"
          placeholder="请输入备注信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="可透支额度" prop="creditLimit">
        <el-input-number
          v-model="form.creditLimit"
          :min="0"
          :precision="2"
          :step="1000"
          :max="1000000"
          style="width: 100%"
          placeholder="请输入可透支额度"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="状态标识" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="正常">正常</el-radio>
          <el-radio label="冻结">冻结</el-radio>
          <el-radio label="禁用">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditAccount',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    accountData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        memberName: '',
        accountType: '',
        accountName: '',
        remark: '',
        creditLimit: 0,
        status: '正常'
      },
      memberOptions: [
        { value: '张三', label: '张三' },
        { value: '李四', label: '李四' },
        { value: '王五', label: '王五' }
      ],
      rules: {
        memberName: [{ required: true, message: '请选择所属会员', trigger: 'change' }],
        accountType: [{ required: true, message: '请选择账户类型', trigger: 'change' }],
        accountName: [{ required: true, message: '请输入账户名称', trigger: 'blur' }],
        creditLimit: [{ required: true, message: '请输入可透支额度', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态标识', trigger: 'change' }]
      }
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) {
        this.initFormData();
      }
    }
  },
  methods: {
    // 初始化表单数据
    initFormData() {
      if (this.accountData && Object.keys(this.accountData).length > 0) {
        this.form = {
          memberName: this.accountData.memberName || '',
          accountType: this.accountData.accountType || '',
          accountName: this.accountData.accountName || '',
          remark: this.accountData.remark || '',
          creditLimit: parseFloat(this.accountData.creditLimit) || 0,
          status: this.accountData.status || '正常'
        };
      }
    },
    // 关闭对话框
    handleClose() {
      this.$refs.accountForm && this.$refs.accountForm.resetFields();
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    // 提交表单
    submitForm() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          // 提交表单数据
          this.$emit('submit', this.form);
          this.handleClose();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 20px;
}

.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
</style>
