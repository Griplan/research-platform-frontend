<template>
  <el-dialog
    title="生成账单"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="dialog-content">
      <div class="dialog-message">
        <p>是否确认生成上月的设施账单汇总?</p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'GenerateBillDialog',
  data() {
    return {
      dialogVisible: true,
      loading: false
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleSubmit() {
      this.loading = true;
      // 模拟API调用
      setTimeout(() => {
        this.loading = false;
        this.$emit('submit');
        this.handleClose();
        this.$message.success('账单生成成功');
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;

  .dialog-icon {
    font-size: 24px;
    color: #e6a23c;
    margin-right: 15px;
    padding-top: 5px;
  }

  .dialog-message {
    flex: 1;

    p {
      margin: 0;
      line-height: 24px;
      font-size: 16px;
    }

    .sub-message {
      color: #909399;
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
</style>
