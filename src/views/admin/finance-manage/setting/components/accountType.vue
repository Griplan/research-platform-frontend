<template>
  <div>
    <div class="header-container">
      <h4>应用设置</h4>
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
        <el-table-column prop="note" label="备注" />
        <el-table-column prop="creditLimit" label="可透支额度" width="240">
          <template slot-scope="scope">
            <span style="color: #457cb8">- ${{ scope.row.creditLimit }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="serialNumber" label="序号数字" width="240"> </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
              编辑
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'CostCenter',
  data() {
    return {
      loading: false,
      settingList: [
        {
          note: '通用账户',
          creditLimit: '100000',
          serialNumber: '1'
        },
        {
          note: '现金账户',
          creditLimit: '100000',
          serialNumber: '2'
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
      this.fetchCenterList();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchCenterList();
    },
    fetchCenterList() {
      this.loading = true;
      // 这里应该是实际的API调用，获取成本中心列表数据
      // this.$api.finance.getCostCenterList(this.pagination).then(res => {
      //   this.centerList = res.data.records;
      //   this.total = res.data.total;
      // }).finally(() => {
      //   this.loading = false;
      // });

      // 模拟数据加载
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    // 处理编辑
    handleEdit(row) {
      this.$message.info(`编辑成本中心：${row.centerName}`);
      // 这里应该打开编辑对话框或者跳转到编辑页面
      // this.$router.push(`/finance-manage/setting/cost-center/edit/${row.centerId}`);
    }
  },
  created() {
    this.fetchCenterList();
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
</style>
