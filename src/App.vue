<template>
  <div class="App">
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>
<style lang="less" scoped>
.App {
  width: 100vw;
  height: 100vh;
}
</style>


// TODO 剩下任务:
// TODO 添加可视化数据页面的样式
// TODO 使用MQTT通信 进行通信测试
// TODO 服务器提供主题 NB设备订阅主题 NB设备向主题发送数据
