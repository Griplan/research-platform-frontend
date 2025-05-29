<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="门禁控制" name="first">
        <access-controler v-if="activeName === 'first'" />
      </el-tab-pane>
      <el-tab-pane label="识别设备" name="second"> </el-tab-pane>
      <el-tab-pane label="门禁客户端" name="third"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AccessControler from './components/accessControler.vue';
export default {
  components: {
    AccessControler
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
