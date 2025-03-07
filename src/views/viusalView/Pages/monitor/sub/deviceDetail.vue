<template>
  <div class="detail">
    <!-- 导航栏 -->
    <div class="detail_nav">
      <el-button type="primary" class="return_btn" @click="handleReturn">
        <el-icon><Back /></el-icon>返回
      </el-button>
    </div>

    <!-- 主要内容区域 -->
    <div class="detail_main">
      <!-- 内容介绍 -->
      <div class="detail_content">
        <h3>设备状态</h3>
        <p>当前设备运行状态：正常</p>
        <p>设备编号：DEV-001</p>
        <p>最后更新时间：2023-10-01 12:00:00</p>
      </div>

      <!-- 信息展示 -->
      <div class="detail_information">
        <h3>数据可视化</h3>
        <div class="chart-container">
          <!-- 这里可以放置图表组件 -->
          <p>图表区域</p>
        </div>
      </div>

      <!-- 消息列表 -->
      <div class="detail_messagebox">
        <h3>消息列表</h3>
        <div class="message-list">
          <!-- 这里可以放置消息列表 -->
          <p>消息1：设备启动成功</p>
          <p>消息2：数据上传完成</p>
        </div>
      </div>

      <!-- 操作面板 -->
      <div class="operation">
        <h3>操作面板</h3>
        <el-button type="primary">启动设备</el-button>
        <el-button type="danger" style="margin-left: 12px">停止设备</el-button>
        <el-button type="warning">重启设备</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleReturn = () => {
  router.push('/monitor')
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
  padding: 10px 20px;
  box-sizing: border-box;

  .detail_nav {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
    border-radius: 8px;

    .return_btn {
      width: 80px;
      height: 36px;
      border-radius: 6px;
      font-size: 14px;
    }
  }

  .detail_main {
    width: 100%;
    margin-top: 20px;
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr; /*3 列 */
    grid-template-rows: repeat(4); /*4 行 */
    gap: 20px;

    .detail_content,
    .detail_information,
    .detail_messagebox,
    .operation {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h3 {
        margin-bottom: 16px;
        font-size: 18px;
        color: #303133;
      }

      p {
        margin: 8px 0;
        font-size: 14px;
        color: #606266;
      }
    }

    /* 设备状态 */
    .detail_content {
      grid-row: 2 / 5; /* 2行 */
      grid-column: 1; /* 第1列 */
    }

    /* 可视化数据 */
    .detail_information {
      grid-row: span 4; /* 占据三行 */
      grid-column: 2; /* 第二列 */
      display: flex;
      flex-direction: column;
      flex: 1;
      .chart-container {
        min-height: 400px; /* 高度固定 */
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f9fafc;
        border-radius: 6px;
      }
    }

    /* 消息列表 */
    .detail_messagebox {
      grid-row: span 3; /* 占据两行 */
      grid-column: 3; /* 第3列 */
      .message-list {
        max-height: 200px;
        overflow-y: auto;
      }
    }

    /* 操作面板 */
    .operation {
      grid-row: 4; /*占据两行*/
      grid-column: 3; /* 第3列 */
      display: flex;
      flex-direction: column;
      gap: 12px;

      .el-button {
        width: 100%;
        margin-left: 0;
      }
    }
  }
}
</style>
