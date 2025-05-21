<template>
  <el-dialog :visible="dialogVisible" :title="title" width="30%" v-loading="loading">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="账户编号" prop="research_group_account_id">
        <el-input
          v-model="form.research_group_account_id"
          placeholder="请输入账户编号"
          size="mini"
          class="keep-25"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="费用分类" prop="cost_classification">
        <el-input
          v-model="form.cost_classification"
          placeholder="请输入费用分类"
          size="mini"
          class="keep-25"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model="form.amount" placeholder="请输入金额" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="结算方式" prop="settlement_method">
        <el-input
          v-model="form.settlement_method"
          placeholder="请输入结算方式"
          size="mini"
          class="keep-25"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        research_group_account_id: '',
        cost_classification: '',
        amount: '',
        settlement_method: ''
      },
      dialogVisible: true,
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
        cost_classification: [{ required: true, message: '请输入费用分类', trigger: 'blur' }],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          {
            type: 'number',
            message: '金额必须为数字',
            trigger: 'blur',
            transform: value => Number(value)
          }
        ],
        settlement_method: [{ required: true, message: '请输入结算方式', trigger: 'blur' }]
      }
    };
  },
  computed: {
    title() {
      return '新增消费记录';
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form);
        } else {
          this.$message.error('请填写完整的表单信息');
          return false;
        }
      });
    },
    closeDialog() {
      this.$refs.form.resetFields();
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.keep-25 {
  width: 40%;
}
</style>
