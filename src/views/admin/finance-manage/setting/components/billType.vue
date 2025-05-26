<template>
  <div>
    <div class="header-container">
      <h4>账单类型</h4>
      <div class="button-container"></div>
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
        <el-table-column prop="name" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="mini" class="keep-30" />
          </template>
        </el-table-column>
        <el-table-column prop="defaultCategory" label="默认费用分类" width="400">
          <template slot-scope="scope">
            <el-select v-model="scope.row.defaultCategory" size="mini">
              <el-option label="动物费" value="请选择"></el-option>
              <el-option label="饲养费" value="请选择"></el-option>
              <el-option label="进出费" value="请选择"></el-option>
              <el-option label="其他" value="请选择"></el-option>
              <el-option label="加班费" value="请选择"></el-option>
              <el-option label="预约使用费" value="请选择"></el-option>
              <el-option label="技术服务费" value="请选择"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
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
import { getAllBillType } from '@/api/finance';
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
      this.fetchAllBillType();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.fetchAllBillType();
    },
    // 处理删除
    handleDelete(row) {
      this.$message.info(`删除账单类型：${row.note}`);
    },
    // 保存所有
    handleSaveAll() {
      this.$message.info('保存所有');
    },
    // 查询所有账单类型
    fetchAllBillType() {
      this.loading = true;
      getAllBillType(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.settingList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.fetchAllBillType();
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
