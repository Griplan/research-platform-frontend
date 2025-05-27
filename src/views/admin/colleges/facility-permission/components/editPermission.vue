<template>
  <el-dialog title="编辑" :visible="true" width="70%" v-loading="loading" @close="closeDialog">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="用户名称"> {{ form.user_name }} </el-form-item>
      <el-form-item label="开始日期" prop="start_date">
        <el-date-picker
          v-model="form.start_date"
          type="date"
          placeholder="选择开始日期"
          size="mini"
          class="keep-25"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期" prop="end_date">
        <el-date-picker
          v-model="form.end_date"
          type="date"
          placeholder="选择截止日期"
          size="mini"
          class="keep-25"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="立即生效" prop="is_effective">
        <el-radio-group v-model="form.is_effective" size="mini">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限项">
        <el-transfer
          v-model="form.permissions"
          :data="permissionList"
          :titles="['用户尚未拥有权限', '用户拥有权限']"
          :props="{
            key: 'door_id',
            label: 'door_name'
          }"
          @left-check-change="leftCheckChange"
        >
        </el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="mini">保 存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateUserPermission, getUserPermissionById } from '@/api/colleges';

export default {
  name: 'EditPermission',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        user_name: '',
        start_date: '',
        end_date: '',
        is_effective: 0,
        permissions: []
      },
      loading: false,
      rules: {
        start_date: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        end_date: [{ required: true, message: '请选择截止日期', trigger: 'change' }],
        is_effective: [{ required: true, message: '请选择是否立即生效', trigger: 'change' }],
        permissions: [{ required: true, message: '请选择权限项', trigger: 'change' }]
      },
      permissionList: []
    };
  },
  created() {
    // 如果有传入的数据，则初始化表单
    if (this.data) {
      console.log(this.data);
      this.form.start_date = new Date(this.data.start_time);
      this.form.end_date = new Date(this.data.end_time);
      Object.assign(this.form, this.data); //不能整个替换,会破换响应式
      this.getPermissionList();
    }
  },
  methods: {
    getPermissionList() {
      getUserPermissionById(this.data.id).then(res => {
        if (res.status === 1) {
          // 合并用户拥有的权限和未拥有的权限
          let data = [...res.data.userPermissionLinks, ...res.data.userNoPermission];
          this.permissionList = data.map(item => ({
            door_id: item.door_id,
            door_name: item.door_name
          }));
          // 设置已选中的权限
          this.form.permissions = res.data.userPermissionLinks.map(item => item.door_id);
        }
      });
    },
    leftCheckChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys, '33333333333');
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateUserPermission({
            id: this.data.id,
            user_name: this.form.user_name,
            start_time: this.form.start_date,
            end_time: this.form.end_date,
            doors: this.form.permissions
          })
            .then(res => {
              if (res.status === 1) {
                this.$message.success(res.msg);
                this.closeDialog();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => this.$message.error('保存失败'));
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
