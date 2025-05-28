<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="40%"
    v-loading="loading"
    @close="closeDialog"
  >
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="设施编号" prop="room_id">
        <el-input v-model="form.room_id" placeholder="请输入设施编号" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="房门名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入房门名称" size="mini" class="keep-25">
        </el-input>
      </el-form-item>
      <el-form-item label="是否为主门" prop="is_main_door">
        <el-radio-group v-model="form.is_main_door" size="mini">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别限制" prop="gender_limitation">
        <el-select
          v-model="form.gender_limitation"
          placeholder="请选择性别限制"
          size="mini"
          class="keep-25"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
          <el-option label="无" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="请输入描述"
          size="mini"
          :rows="3"
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
import { addDoor } from '@/api/colleges';
export default {
  name: 'AddDoors',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        room_id: '',
        name: '',
        is_main_door: 0,
        gender_limitation: 0,
        description: ''
      },
      dialogVisible: true,
      rules: {
        room_id: [{ required: true, message: '请输入设施编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入房门名称', trigger: 'blur' }],
        is_main_door: [{ required: true, message: '请选择是否为主门', trigger: 'change' }],
        gender_limitation: [{ required: true, message: '请选择性别限制', trigger: 'change' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      }
    };
  },
  computed: {
    title() {
      return '新建';
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addDoor(this.form)
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
  width: 40%;
}
</style>
