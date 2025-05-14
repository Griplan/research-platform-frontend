<template>
  <div class="basic-setting">
    <el-form :model="form" label-width="180px">
      <el-form-item label="允许账户透支">
        <el-switch v-model="form.allowOverdraft" />
      </el-form-item>
      <el-form-item label="启用专款专用">
        <el-switch v-model="form.allowSpecialUse" />
      </el-form-item>
      <el-form-item label="账单周期">
        <el-select v-model="form.billCycle" placeholder="请选择账单周期" size="mini">
          <el-option label="日" value="day"></el-option>
          <el-option label="月" value="month"></el-option>
          <el-option label="年" value="year"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动物订单管理费系数">
        <el-input v-model="form.coefficient" class="keep-30" size="mini" />
        <span class="text-gray"
          >管理费&nbsp;=&nbsp;订单总额&nbsp;/&nbsp;系数&nbsp;-&nbsp;订单总额</span
        >
      </el-form-item>
      <el-form-item label="欠费多少天禁用设施权限">
        <el-input v-model="form.days" class="keep-30" size="mini" />
        <span class="text-gray">天</span>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" size="small">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BasicSetting',
  data() {
    return {
      form: {
        allowOverdraft: false,
        allowSpecialUse: false,
        billCycle: 'day',
        coefficient: 0,
        days: 0
      }
    };
  }
};
</script>

<style scoped>
.basic-setting {
  margin-top: 20px;
  .keep-30 {
    width: 30%;
  }
  .text-gray {
    color: #999;
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
