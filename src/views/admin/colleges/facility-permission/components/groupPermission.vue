<template>
  <div class="app-container">
    <div class="header-container">
      <h4>用户权限</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="id" label="会员标识" width="120" />
        <el-table-column prop="name" label="全名" width="110" />
        <el-table-column prop="research_group_account_id" label="成员标识" width="120" />
        <el-table-column prop="remark" label="门禁卡号" />
        <el-table-column prop="remark" label="生物特征" />
        <el-table-column prop="remark" label="第一个权限" />

        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <div class="button-container">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'doorsManage',
  data() {
    return {
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchRecordList();
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.app-container {
  margin-top: 0px;
}
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
