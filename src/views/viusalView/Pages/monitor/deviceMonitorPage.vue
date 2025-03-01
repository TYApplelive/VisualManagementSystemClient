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
        <div class="operation">
          <a class="button addDeviceBtn">添加设备</a>
          <a class="button removeDeviceBtn">删除设备</a>
        </div>
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
          <el-table-column prop="id" label="编号" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="address" label="地址" />
          <el-table-column prop="cpu_usage" label="CPU占用" />
          <el-table-column prop="memory_usage" label="内存占用" />
          <el-table-column prop="disk_usage" label="硬盘占用" />
          <el-table-column prop="last_updated" label="上次更新" />
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
          :page-size="page_size"
          :total="pagination_total"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const page_size = 12 // 固定值，一页十二个数据
const pagination_total = ref(200)
const searchForm = reactive({
  name: '',
  address: '',
})
const tableData = reactive([])
</script>
<style lang="less" scoped>
@base-font-color: #ffffff;
@base-font-size: 14px;
@base-background-color: #071927;
@button-color: rgb(64, 141, 224);
@button-hover-color: rgb(50.8, 116.6, 184.5);
@button-color-danger: rgb(247, 137.4, 137.4);
@button-hover-color-danger: rgb(177.5, 81.6, 81.6);
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

// 上部分搜索框
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

// 下部分信息展示框
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
      .operation {
        display: flex;
        .addDeviceBtn {
          margin-right: 20px;
        }
        .removeDeviceBtn {
          background-color: @button-color-danger;
          &:hover {
            background-color: @button-hover-color-danger;
          }
        }
      }
      .addDeviceBtn.disable {
        cursor: no-drop;
        &:hover {
          background-color: @button-color;
        }
      }
      .addDeviceBtn.disable {
        cursor: no-drop;
        &:hover {
          background-color: @button-color;
        }
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
