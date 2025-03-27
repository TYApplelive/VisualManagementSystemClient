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
          <el-input class="address" placeholder="请输入设备地址" v-model="searchForm.address" clearable />
        </el-form-item>
        <el-form-item>
          <a class="searchBtn button" @click="search">
            <el-icon>
              <Search />
            </el-icon>
            <p>搜索</p>
          </a>
          <a class="resetBtn button" @click="reset">
            <el-icon>
              <RefreshLeft />
            </el-icon>
            <p>重置</p>
          </a>
        </el-form-item>
      </el-form>
    </div>
    <div class="info_dispaly">
      <div class="header">
        <div class="tips">
          <el-icon style="color: rgb(102.2, 177.4, 255); margin-right: 3px">
            <InfoFilled />
          </el-icon>共{{ pagination_total }}条记录
        </div>
        <div class="operation">
          <!-- 工作区按钮 -->
          <a class="button refreshBtn" @click="refresh">
            <el-icon>
              <Refresh />
            </el-icon>
            刷新
          </a>
          <a class="button addDeviceBtn" @click="addDeviceDialogVisible = true">添加设备</a>
          <a class="button removeDeviceBtn" @click="removeDevice">删除设备</a>
        </div>
      </div>
      <div class="main">
        <!-- 表格DOM -->
        <el-table ref="multipleTableRef" class="device-table" :data="tableData" stripe style="width: 100%"
          max-height="520" table-layout="fixed" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="编号" width="350" show-overflow-tooltip />
          <el-table-column prop="name" label="名称" show-overflow-tooltip />
          <el-table-column prop="ip" label="IP" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="address" label="地址" />
          <el-table-column prop="create_time" label="创建时间" />
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleDetail(scope.$index, scope.row)">详细</el-button>
              <el-button link type="primary" size="small" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="switch-pagination" layout="prev, pager, next " :page-size="page_size"
          :total="pagination_total" v-model:current-page="current_page"
          @current-change="page_switch(current_page, search_buffer.id, search_buffer.address)" />
      </div>
    </div>
  </div>

  <!-- 添加设备对话框 -->
  <el-dialog v-model="addDeviceDialogVisible" title="添加设备" width="600px" :before-close="handleClose">
    <addDevice ref="addDeviceRef" />
    <el-dialog v-model="addconfirmVisible" title="提示" width="400px">
      <span>确定要取消添加设备吗?</span>
      <template #footer>
        <el-button @click="addconfirmVisible = false">取消</el-button>
        <el-button type="primary" @click="
          () => {
            addDeviceDialogVisible = false
            addconfirmVisible = false
          }
        ">
          确定
        </el-button>
      </template>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addconfirmVisible = true">取消</el-button>
        <el-button type="primary" @click="
          () => {
            add()
          }
        ">添加
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改设备对话框 -->
  <el-dialog v-model="updateDeviceDialogVisible" title="修改设备" width="600px" :before-close="handleClose">
    <updateDevice ref="updateDeviceRef" />
    <el-dialog v-model="updateconfirmVisible" title="提示" width="400px">
      <span>确定要取消修改设备吗?</span>
      <template #footer>
        <el-button @click="updateconfirmVisible = false">取消</el-button>
        <el-button type="primary" @click="
          () => {
            updateDeviceDialogVisible = false
            updateconfirmVisible = false
          }
        ">
          确定
        </el-button>
      </template>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updateconfirmVisible = true">取消</el-button>
        <el-button type="primary" @click="
          () => {
            update()
          }
        ">更改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import type { DeviceType, UpdateQueryDeviceType, databaseReturn } from '@/types/Monitor/index'

import { onMounted, provide, reactive, ref } from 'vue'
import { isEqual } from 'lodash'
import request from '@/request'
import addDevice from './components/addDevice.vue'
import updateDevice from './components/updateDevice.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// * 数据源请求参数
interface ParamsType {
  limit: number
  skip: number
  id?: string
  address?: string
}

const current_page = ref(1)
const page_size = 12 // 固定值，一页十二个数据
const pagination_total = ref(0)
const searchForm = reactive({
  id: '',
  address: '',
})
const tableData = ref<DeviceType[]>([])

// * 增加设备对话框标志位
const addDeviceDialogVisible = ref(false)
const addconfirmVisible = ref(false)
const addDeviceRef = ref<InstanceType<typeof addDevice> | null>(null)

// * 更新设备对话框标志位
const updateDeviceDialogVisible = ref(false)
const updateconfirmVisible = ref(false)
const updateDeviceRef = ref<InstanceType<typeof updateDevice> | null>(null)

// 搜索缓存区
const search_buffer = reactive({
  id: '',
  address: '',
})

// 选中待删除数组
const selectToremoveArray = ref<DeviceType[]>()
// 表格
const multipleTableRef = ref<TableInstance>()

// * 分页切换函数
const page_switch = async (current_page: number, id?: string, address?: string) => {
  tableData.value = [] // 初始化表格缓冲区
  const page_index = current_page - 1 // 页码更改

  const params = reactive<ParamsType>({
    limit: page_size,
    skip: page_index * page_size,
  })

  if (id) params.id = id.trim()
  if (address) params.address = address.trim()
  const response = await request.get<databaseReturn>('/monitor/db/find', { params })
  const result = response.data.data
  //console.log(result)

  // 拿到数据库数据
  if (result.result) {
    pagination_total.value = result.matchnum
    tableData.value.push(...result.data)
  }
}

// * 页面刷新函数
const page_refresh = async () => {
  // 如果当前页码超过了最大页面，则取最大页码为当前页码
  if (current_page.value > Math.ceil(pagination_total.value / page_size))
    current_page.value = Math.ceil(pagination_total.value / page_size)

  // 页面切换函数
  page_switch(current_page.value, search_buffer.id, search_buffer.address)
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
  if (!isEqual(searchForm, search_buffer)) {
    Object.assign(search_buffer, searchForm) // 搜索存入缓存区
    page_switch(current_page.value, searchForm.id, searchForm.address)
  }
}

const refresh = async () => {
  page_refresh()
}

// 对话框函数 -- add
const add = async () => {
  // 获取设备表单数据
  if (addDeviceRef.value?.form) {
    const FormResult = await addDeviceRef.value.validate()
    if (!FormResult) return //返回空结果，阻塞代码
    const datas: DeviceType = { ...addDeviceRef.value.form }
    const response = await request.post<databaseReturn, DeviceType>('/monitor/addDevice', datas)
    const result = response.data
    // 添加设备成功关闭窗口
    if (result.result) {
      addDeviceDialogVisible.value = false
      refresh()
    } else {
      ElMessageBox.alert(`添加设备失败,${result}`, '提示', {
        type: 'error',
      })
    }
  }
}

// 对话框函数 -- update
const update = async () => {
  // 获取设备表单数据
  if (updateDeviceRef.value?.form) {
    const FormResult = await updateDeviceRef.value.validate()
    if (!FormResult) return //返回空结果，阻塞代码
    const datas: UpdateQueryDeviceType = {
      findParam: { id: updateDeviceRef.value?.form.id },
      updateParam: updateDeviceRef.value?.form,
    }

    const response = await request.post<databaseReturn, UpdateQueryDeviceType>(
      '/monitor/updateDevice',
      datas
    )
    const result = response.data
    // 更新设备成功关闭窗口
    if (result.result) {
      updateDeviceDialogVisible.value = false
      refresh()
      ElMessage({
        message: '修改数据完成',
        type: 'success',
      })
    } else {
      ElMessageBox.alert(`更新设备失败,${result}`, '提示', {
        type: 'error',
      })
    }
  }
}

// * 设备操作对话框关闭提示
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否关闭当前操作,关闭后未保存操作都将销毁', '提示').then(() => {
    done()
  })
}

// 删除设备逻辑函数
const removeDevice = async () => {
  if (selectToremoveArray.value?.length) {
    ElMessageBox.confirm(`是否删除选中的设备?`, '提示').then(async () => {
      // 选择确定删除
      const RemoveArray = selectToremoveArray.value?.map(item => item.id)
      const response = await request.post<databaseReturn, string[]>(
        '/monitor/removeDevices',
        RemoveArray
      )
      const result = response.data
      if (result.result) {
        // 删除结束刷新页面
        page_refresh()
      } else {
        ElMessageBox.alert(`删除设备失败,${result}`, '提示', {
          type: 'error',
        })
      }
    })
  } else {
    ElMessageBox.alert(`请选择要删除的设备`, '提示', {
      type: 'error',
    })
  }
}

const handleSelectionChange = (val: DeviceType[]) => {
  // 同步到删除数组中
  selectToremoveArray.value = val
}

// 表内列工作列--- 详细

const row = ref<DeviceType>()
// 向子组件提供数据
provide('updateDialogRow', row)
const handleDetail = (index: number, row: DeviceType) => {
  router.push({ name: 'monitorDetail', params: { id: row.id } })
}
// 表内列工作列--- 修改
const handleUpdate = (index: number, row_: DeviceType) => {
  // 发送数据到子组件updateDevice
  row.value = row_
  updateDeviceDialogVisible.value = true // 触发修改弹窗
}

//初始化
onMounted(async () => {
  await page_switch(current_page.value)
})

// @Test-测试用function

// import { range } from 'lodash'
// const _test_ = async () => {
//   for await (const i of range(10, 100)) {
//     const datas: DeviceType = {
//       name: `数据测试设备${i}`,
//       id: '',
//       status: 'disconnect',
//       ip: `127.0.0.${i}`,
//       address: `成都工业学院`,
//     }
//     const se = await request.post<databaseReturn, DeviceType>('/monitor/addDevice', datas)
//     console.log(se)
//   }
// }
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

        .addDeviceBtn,
        .refreshBtn {
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
