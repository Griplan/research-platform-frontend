<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">401</h1>
        <h2>你没有权限去该页面</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <span @click="toHome">回首页</span>
          </li>
          <!-- <li class="link-type">
            <span @click="back"> 返回上一页 </span>
          </li> -->
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif';

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
    };
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/home' });
      } else {
        this.$router.go(-1);
      }
    },
    toHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;

      span {
        cursor: pointer;
        color: #008489;
      }
    }
  }
}
</style>
