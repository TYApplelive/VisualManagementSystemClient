<template>
  <div class="addDevice">
    <el-form :model="form" label-width="auto">
      <el-form-item label="设备名称">
        <el-input v-model="form.name" placeholder="默认为设备ID" />
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input v-model="form.id" placeholder="请输入设备uuid/唯一编号" />
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="form.status" placeholder="请选择设备的状态" clearable>
          <el-option
            v-for="item in optins"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备IP">
        <el-input v-model="form.ip" placeholder="xxx.xxx.xxx.xxx" />
      </el-form-item>
      <el-form-item label="设备地址">
        <el-input v-model="form.address" placeholder="xxx街道xx号" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  id: '',
  status: 'disconnect',
  ip: '',
  address: '',
})

const optins = [
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

defineExpose({
  form,
})
</script>
<style lang="less" scoped>
.addDevice {
  width: auto;
  margin: 20px 40px;
}
</style>
