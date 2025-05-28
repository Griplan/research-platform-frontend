<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="设施进出记录" name="first"> <facility-record /> </el-tab-pane>
      <el-tab-pane label="门禁刷卡记录" name="second"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FacilityRecord from './components/faclityRecord.vue';
export default {
  components: {
    FacilityRecord
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
