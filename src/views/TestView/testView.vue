<template>
  <div class="testView">
    <h1>MQTT 接收测试</h1>
    <button @click="open_MQTT_Client">点击开启MQTT客户端</button>
    <button @click="close_MQTT_Client">点击关闭MQTT客户端</button>
  </div>
</template>

<script setup lang="ts">
import request from '@/request';
// 打开mqtt客户端
const open_MQTT_Client = () => {
  request.get('/mqtt/open').then((res) => {
    alert(res.data.tips);
  })
}

// 关闭mqtt客户端
const close_MQTT_Client = () => {
  request.get('/mqtt/close').then((res) => {
    alert(res.data.tips);
  })
}
</script>
<style lang="less" scoped></style>
