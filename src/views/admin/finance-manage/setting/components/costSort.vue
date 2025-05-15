<template>
  <div>
    <div class="header-container">
      <h4>账单类型</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-plus" type="warning">新增</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :data="settingList"
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column prop="note" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.note" size="mini" class="keep-30" />
          </template>
        </el-table-column>
        <el-table-column prop="accountType" label="结算账户类型" width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.accountType" size="mini" placeholder="请选择账户类型">
              <el-option label="现金账户" value="cash"></el-option>
              <el-option label="银行账户" value="bank"></el-option>
              <el-option label="支付宝账户" value="alipay"></el-option>
              <el-option label="微信账户" value="wechat"></el-option>
              <el-option label="其他账户" value="other"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="serialNumber" label="序号数字">
          <template slot-scope="scope">
            <el-input v-model="scope.row.serialNumber" size="mini" type="number" class="keep-30" />
          </template>
        </el-table-column>
        <el-table-column prop="defaultSettlement" label="默认结算方式" width="150" />
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
      <el-button type="primary" size="mini" icon="el-icon-circle-check" @click="handleSaveAll"
        >保存所有</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CostSort',
  data() {
    return {
      loading: false,
      settingList: [
        {
          section: 'A',
          note: '通用账户',
          accountType: 'bank',
          serialNumber: '1',
          defaultSettlement: '银行转账'
        },
        {
          section: 'B',
          note: '现金账户',
          accountType: 'cash',
          serialNumber: '2',
          defaultSettlement: '现金支付'
        },
        {
          section: 'C',
          note: '支付宝账户',
          accountType: 'alipay',
          serialNumber: '3',
          defaultSettlement: '支付宝转账'
        },
        {
          section: 'D',
          note: '微信账户',
          accountType: 'wechat',
          serialNumber: '4',
          defaultSettlement: '微信支付'
        }
      ],
      pagination: {
        page: 1,
        size: 10
      },
      total: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.size = val;
      this.fetchSettingList();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchSettingList();
    },
    fetchSettingList() {
      this.loading = true;
      // 这里应该是实际的API调用，获取账单类型列表数据
      // this.$api.finance.getCostSortList(this.pagination).then(res => {
      //   this.settingList = res.data.records;
      //   this.total = res.data.total;
      // }).finally(() => {
      //   this.loading = false;
      // });

      // 模拟数据加载
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    // 处理删除
    handleDelete(row) {
      this.$message.info(`删除账单类型：${row.note}`);
    },
    // 保存所有
    handleSaveAll() {
      this.$message.info('保存所有');
    }
  },
  created() {
    this.fetchSettingList();
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  color: #457cb8;

  .button-container {
    display: flex;
  }
}
.table-container {
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  border-top: 3px solid #4b7cb1;
  border-left: 1px solid #f4f4f5;
  border-right: 1px solid #f4f4f5;
  border-bottom: 1px solid #f4f4f5;

  :deep(.el-table) {
    font-size: 11px;

    th,
    td {
      padding: 2px;
    }

    .cell {
      line-height: 16px;
      padding-left: 2px;
      padding-right: 2px;
    }

    .el-tag {
      padding: 0 2px;
      height: 18px;
      line-height: 16px;
    }
  }

  .pagination {
    text-align: center;
    margin-top: 15px;
  }
}
.keep-30 {
  width: 30%;
}
</style>
