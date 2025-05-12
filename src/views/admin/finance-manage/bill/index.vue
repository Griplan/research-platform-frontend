<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="custom-tabs">
      <el-tab-pane label="消费账单汇总" name="first">
        <consume-bill />
      </el-tab-pane>
      <el-tab-pane label="设施账单汇总" name="second">
        <facility-bill />
      </el-tab-pane>
      <el-tab-pane label="动物账单" name="third">
        <animal-bill />
      </el-tab-pane>
      <el-tab-pane label="饲养账单" name="fourth">
        <feeding-bill />
      </el-tab-pane>
      <el-tab-pane label="进出账单" name="fifth">
        <in-out-bill />
      </el-tab-pane>
      <el-tab-pane label="技术服务账单" name="sixth">
        <tech-service-bill />
      </el-tab-pane>
      <el-tab-pane label="预约账单" name="seventh">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConsumeBill from './components/consumeBill.vue';
import FacilityBill from './components/facilityBill.vue';
import AnimalBill from './components/animalBill.vue';
import FeedingBill from './components/feedingBill.vue';
import InOutBill from './components/inOutBill.vue';
import TechServiceBill from './components/techServiceBill.vue';
export default {
  components: {
    ConsumeBill,
    FacilityBill,
    AnimalBill,
    FeedingBill,
    InOutBill,
    TechServiceBill
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
