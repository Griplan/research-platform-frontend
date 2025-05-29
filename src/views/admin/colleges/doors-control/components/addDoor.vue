<template>
  <el-dialog title="新建门禁" :visible="true" width="50%" v-loading="loading" @close="closeDialog">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="门禁品牌类型" prop="brand_type">
        <el-input v-model="form.brand" placeholder="请输入门禁品牌类型" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="门禁名称" prop="door_name">
        <el-input v-model="form.name" placeholder="请输入门禁名称" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="序列号" prop="serial_number">
        <el-input v-model="form.number" placeholder="请输入序列号" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="IP地址" prop="ip_address">
        <el-input v-model="form.iP" placeholder="请输入IP地址" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="form.port" placeholder="请输入端口" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="门数" prop="door_count">
        <el-input-number v-model="form.door_count" :min="1" :max="10" size="mini" class="keep-25">
        </el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="mini">保 存</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addDoor } from '@/api/colleges';
export default {
  name: 'AddDoor',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        brand: '',
        name: '',
        number: '',
        iP: '',
        port: '',
        door_count: 1
      },
      loading: false,
      rules: {
        brand_type: [{ required: true, message: '请输入门禁品牌类型', trigger: 'blur' }],
        door_name: [{ required: true, message: '请输入门禁名称', trigger: 'blur' }],
        serial_number: [{ required: true, message: '请输入序列号', trigger: 'blur' }],
        ip_address: [{ required: true, message: '请输入IP地址', trigger: 'blur' }],
        port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
        door_count: [{ required: true, message: '请输入门数', trigger: 'change' }]
      }
    };
  },
  created() {
    // 如果有传入的数据，则初始化表单
    if (this.data) {
      Object.assign(this.form, this.data);
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          addDoor(this.form)
            .then(res => {
              if (res.status === 1) {
                this.$message.success(res.msg);
                this.closeDialog();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => this.$message.error('保存失败'))
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    closeDialog() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.keep-25 {
  width: 25%;
}
</style>
