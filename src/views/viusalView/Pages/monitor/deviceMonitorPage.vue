<template>
  <div class="deviceMonitor">
    <div class="search_nav">
      <el-form :inline="true" class="form-inline" :model="searchForm">
        <el-form-item class="search_nav_item">
          <p class="input-title">设备编号</p>
          <el-input class="name" placeholder="请输入设备编号" v-model="searchForm.id" clearable />
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
          <a class="searchBtn button" @click="search">
            <el-icon><Search /></el-icon>
            <p>搜索</p>
          </a>
          <a class="resetBtn button" @click="reset">
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
          >共{{ pagination_total }}条记录
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
          <el-table-column prop="id" label="编号" width="350" show-overflow-tooltip />
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
          v-model:current-page="current_page"
          @current-change="page_switch(current_page, search_buffer.id, search_buffer.address)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { isEqual } from 'lodash'
import request from '@/request'

// * 与后端的API返回数据对应
interface databaseReturn {
  data: Array<never>
  message: string
  result: boolean
  matchnum: number
}

// * 数据源请求参数
interface ParamsType {
  limit: number
  skip: number
  id?: string
  address?: string
}

const current_page = ref(1)
const page_index = ref(1)
const page_size = 12 // 固定值，一页十二个数据
const pagination_total = ref(0)
const searchForm = reactive({
  id: '',
  address: '',
})
const tableData = ref([])

// 搜索缓存区
const search_buffer = reactive({
  id: '',
  address: '',
})

// * 分页切换函数
const page_switch = async (current_page: number, id?: string, address?: string) => {
  tableData.value = [] // 初始化表格缓冲区
  page_index.value = current_page - 1 // 页码更改

  const params = reactive<ParamsType>({
    limit: page_size,
    skip: page_index.value * page_size,
  })

  if (id) params.id = id.trim()
  if (address) params.address = address.trim()

  const response = await request.get<databaseReturn>('/monitor/db/find', { params })
  const result = response.data.data
  console.log(result)

  if (result.result) {
    pagination_total.value = result.matchnum
    tableData.value.push(...result.data)
  }
}

const search = async () => {
  current_page.value = 1 // 当前页数恢复
  // 如果比较缓冲区和刚获取的搜索条件不同，则触发一次数据库查询
  if (!isEqual(searchForm, search_buffer)) {
    Object.assign(search_buffer, searchForm) // 搜索存入缓存区
    page_switch(current_page.value, searchForm.id, searchForm.address)
  }
}

const reset = async () => {
  Object.assign(searchForm, { id: '', address: '' })
}

//初始化
onMounted(async () => {
  await page_switch(current_page.value)
})
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
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: @button-hover-color;
    scale: 0.95;
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
