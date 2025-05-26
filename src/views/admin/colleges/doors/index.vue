<template>
  <div class="app-container">
    <div class="header-container">
      <h4>房门管理</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-plus" type="primary" @click="handleAdd"
          >新建</el-button
        >
        <el-button size="mini" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        :data="recordList"
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="id" label="房门编号" width="120" />
        <el-table-column prop="place" label="设施名称" />
        <el-table-column prop="name" label="房门名称" width="200" />
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
    <add-doors v-if="addDialogVisible" :loading="loading" @close="handleClose" />
  </div>
</template>

<script>
import { getDoorsList, addDoor, editDoor, delDoor } from '@/api/colleges';
import AddDoors from './components/addDoors.vue';

export default {
  name: 'doorsManage',
  components: {
    AddDoors
  },
  data() {
    return {
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      recordList: [],
      addDialogVisible: false
    };
  },
  methods: {
    getRecordList() {
      this.loading = true;
      getDoorsList(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.recordList = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleDelete(row) {
      this.$confirm('确定删除该房门吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDoor({ id: row.id })
          .then(res => {
            if (res.status === 1) {
              this.$message.success(res.msg);
              this.getRecordList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => this.$message.error(res.msg));
      });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.getRecordList();
    },
    handleAdd() {
      this.addDialogVisible = true;
    },
    handleClose() {
      this.addDialogVisible = false;
      this.getRecordList();
    }
  },
  created() {
    this.getRecordList();
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
