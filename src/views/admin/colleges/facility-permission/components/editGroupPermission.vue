<template>
  <el-dialog title="编辑" :visible="true" width="70%" v-loading="loading" @close="closeDialog">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="课题组"> {{ form.research_group_name }} </el-form-item>
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
      <el-form-item label="立即生效" prop="take_effect">
        <el-radio-group v-model="form.take_effect" size="mini">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限项">
        <el-transfer
          v-model="form.permissions"
          :data="permissionList"
          :titles="['课题组尚未拥有权限', '课题组拥有权限']"
          :props="{
            key: 'door_id',
            label: 'door_place'
          }"
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
import { updateGroupPermission } from '@/api/colleges';

export default {
  name: 'EditGroupPermission',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        research_group_name: '',
        start_date: '',
        end_date: '',
        take_effect: 0,
        permissions: []
      },
      loading: false,
      rules: {
        start_date: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        end_date: [{ required: true, message: '请选择截止日期', trigger: 'change' }],
        take_effect: [{ required: true, message: '请选择是否立即生效', trigger: 'change' }],
        permissions: [{ required: true, message: '请选择权限项', trigger: 'change' }]
      },
      permissionList: []
    };
  },
  created() {
    // 如果有传入的数据，则初始化表单
    this.init();
  },
  methods: {
    init() {
      if (this.data) {
        this.form.start_date = new Date(this.data.start_time);
        this.form.end_date = new Date(this.data.end_time);

        Object.assign(this.form, this.data); //不能整个替换,会破换响应式
        let data = [...this.data.groupPermissionLinks, ...this.data.groupNoPermission];
        this.permissionList = data.map(item => ({
          door_id: item.door_id,
          door_place: item.door_place
        }));
        // 设置已选中的权限
        this.form.permissions = this.data.groupPermissionLinks.map(item => item.door_id);
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateGroupPermission({
            id: this.data.id,
            research_group_id: this.data.research_group_id,
            research_group_name: this.form.research_group_name,
            start_time: this.form.start_date,
            end_time: this.form.end_date,
            doors: this.form.permissions,
            is_take_effect: this.form.take_effect
          })
            .then(res => {
              if (res.status === 1) {
                this.$message.success(res.msg);
                this.closeDialog();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => this.$message.error(res.msg));
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
