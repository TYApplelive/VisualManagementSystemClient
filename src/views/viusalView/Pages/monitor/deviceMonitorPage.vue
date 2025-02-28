<template>
  <div class="deviceMonitor">
    <div class="search_nav">
      <el-form :inline="true" class="form-inline" :model="searchForm">
        <el-form-item class="search_nav_item">
          <p class="input-title">设备名称</p>
          <el-input
            class="name"
            placeholder="请输入设备名称或编号"
            v-model="searchForm.name"
            clearable
          />
        </el-form-item>
        <el-form-item class="search_nav_item">
          <p class="input-title">设备地址</p>
          <el-input
            class="address"
            placeholder="请输入设备地址"
            v-model="searchForm.address"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <a class="searchBtn button"
            ><el-icon><Search /></el-icon>
            <p>搜索</p></a
          >
          <a class="resetBtn button">
            <el-icon><RefreshLeft /></el-icon>
            <p>重置</p>
          </a>
        </el-form-item>
      </el-form>
    </div>
    <div class="info_dispaly">
      <div class="header">
        <div class="tips">
          <el-icon style="color: rgb(102.2, 177.4, 255); margin-right: 3px"><InfoFilled /></el-icon
          >共0条记录
        </div>
        <a class="button addDeviceBtn">添加设备</a>
      </div>
      <div class="main">
        <el-table
          class="device-table"
          :data="tableData"
          stripe
          style="width: 100%"
          max-height="520"
          table-layout="fixed"
        >
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default>
              <el-button link type="primary" size="small">详细</el-button>
              <el-button link type="primary" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="switch-pagination"
          layout="prev, pager, next "
          :page-size="10"
          :total="200"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const searchForm = reactive({
  name: '',
  address: '',
})

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style lang="less" scoped>
@base-font-color: #ffffff;
@base-font-size: 14px;
@base-background-color: #071927;
@button-color: #00aeec;
@button-hover-color: #40c5f1;

.button {
  @height: 30px;
  width: 100px;
  height: @height;
  background-color: @button-color;
  text-align: center;
  line-height: @height;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: @button-hover-color;
  }

  .el-icon {
    margin-right: 2px;
  }
}

.deviceMonitor {
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  flex: 1;

  .search_nav {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .form-inline {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 20px;
      .el-form-item {
        margin-bottom: 0px;
      }
      .search_nav_item {
        :deep(.el-form-item__content) {
          .input-title {
            width: 80px;
          }
          width: 300px;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          align-items: center;
        }
      }
    }

    .searchBtn {
      margin-right: 10px;
      &:hover {
        background-color: @button-hover-color;
      }
    }

    .resetBtn {
      background-color: #ffffff;
      color: #071927;
      border: 1px solid #2a2e31a6;
      &:hover {
        background-color: #e7e2e2;
      }
    }
  }
}

.deviceMonitor {
  .info_dispaly {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    display: flex;
    flex-direction: column;

    .header {
      height: 80px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 10px 20px;
      margin: 20px 10px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      box-shadow:
        rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      .tips {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 10px;
        border-radius: 5px;
        border: 1px solid #00aeec;
        background-color: rgb(201, 230, 241);
      }
    }
    .main {
      height: 100%;
      border-radius: 5px;
      padding: 0 20px 10px 20px;
      margin: 0px 10px 10px 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .device-table {
        user-select: text;
        flex: 1;
      }
      .switch-pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>
