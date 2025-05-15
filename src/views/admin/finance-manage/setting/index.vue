<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="基础设置" name="first">
        <BasicSetting />
      </el-tab-pane>
      <el-tab-pane label="成本中心" name="second">
        <CostCenter />
      </el-tab-pane>
      <el-tab-pane label="费用分类" name="third">
        <CostSort />
      </el-tab-pane>
      <el-tab-pane label="账单类型" name="fourth">
        <BillType />
      </el-tab-pane>
      <el-tab-pane label="账户类型" name="fifth">
        <AccountType />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicSetting from './components/basicSetting.vue';
import CostCenter from './components/costCenter.vue';
import AccountType from './components/accountType.vue';
import BillType from './components/billType.vue';
import CostSort from './components/costSort.vue';
export default {
  components: {
    BasicSetting,
    CostCenter,
    AccountType,
    BillType,
    CostSort
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;

  .custom-tabs {
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
    border: none;
    min-height: calc(100vh - 200px);
    background: #fff;

    :deep(.el-tabs__header) {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
    }
  }
}
</style>
