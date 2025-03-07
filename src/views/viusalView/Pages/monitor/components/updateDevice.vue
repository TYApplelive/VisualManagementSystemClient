<template>
  <div class="updateDevice">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="form.name" placeholder="默认为设备ID" />
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input v-model="form.id" placeholder="请输入设备uuid/唯一编号" disabled />
      </el-form-item>
      <el-form-item label="设备状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择设备的状态" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备IP" prop="ip">
        <el-input v-model="form.ip" placeholder="xxx.xxx.xxx.xxx" />
      </el-form-item>
      <el-form-item label="设备地址" prop="address">
        <el-input v-model="form.address" placeholder="xxx街道xx号" />
      </el-form-item>
      <el-form-item label="设备出厂码" required>
        <el-input v-model="form.EFC" placeholder="" disabled />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { DeviceType } from '@/types/Monitor/device'
import type { FormInstance } from 'element-plus'
import { reactive, ref, inject, onMounted, watch, nextTick, type Ref } from 'vue'

// 表单
const form = reactive<DeviceType>({
  name: '',
  id: '',
  status: 'disconnect',
  ip: '',
  address: '',
  EFC: '',
})

// 选项
const options = [
  {
    value: 'shutdown',
    label: '关机',
  },
  {
    value: 'running',
    label: '运行',
  },
  {
    value: 'standby',
    label: '待机',
  },
  {
    value: 'disconnect',
    label: '未连接',
  },
]

// 表单规则
const rules = {
  name: [
    { required: false, message: '请输入设备名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_-]*$/, // 允许字母、数字、中文、下划线和连字符
      message: '设备名称不能包含特殊字符',
      trigger: 'blur',
    },
  ],
  status: [{ required: true, message: '请选择设备状态', trigger: 'change' }],
  ip: [
    { required: true, message: '请输入设备IP', trigger: 'blur' },
    {
      pattern:
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      message: '请输入有效的IP地址',
      trigger: 'blur',
    },
  ],
  address: [{ required: true, message: '请输入设备地址', trigger: 'blur' }],
  EFC: [
    { required: true, message: '请输入设备出厂码', trigger: 'blur' },
    { min: 10, max: 20, message: '设备出厂码长度应在10到20个字符之间', trigger: 'blur' },
  ],
}

const formRef = ref<FormInstance>()

const validate = async () => {
  const result = await formRef.value?.validate(valid => {
    if (!valid) {
      ElMessageBox.alert(`修改设备失败`, '提示', {
        type: 'error',
      })
    }
  })

  return result
}

// 注入数据
const selectedDevice = inject('updateDialogRow') as Ref<DeviceType | null>

// 向父组件暴露
defineExpose({
  form,
  validate,
  formRef,
})

onMounted(() => {
  // 确保 selectedDevice 已经被初始化
  if (selectedDevice.value) {
    form.name = selectedDevice.value.name
    form.id = selectedDevice.value.id
    form.status = selectedDevice.value.status
    form.ip = selectedDevice.value.ip
    form.address = selectedDevice.value.address
    //form.EFC = selectedDevice.value.EFC
  }
  nextTick(() => {
    // 监听 selectedDevice 的变化
    watch(selectedDevice, newVal => {
      if (newVal) {
        form.name = newVal.name
        form.id = newVal.id
        form.status = newVal.status
        form.ip = newVal.ip
        form.address = newVal.address
        // form.EFC = newVal.value.EFC
      }
    })
  })
})
</script>
<style lang="less" scoped></style>
