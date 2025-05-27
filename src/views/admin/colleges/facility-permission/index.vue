<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="用户权限" name="first"> <user-permisson /> </el-tab-pane>
      <el-tab-pane label="课题组权限" name="second"> </el-tab-pane>
      <el-tab-pane label="设施权限规则" name="third"> </el-tab-pane>
      <el-tab-pane label="规则白名单" name="fourth"> </el-tab-pane>
      <el-tab-pane label="权限审核" name="fifth"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserPermisson from './components/userPermisson.vue';
export default {
  components: {
    UserPermisson
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
