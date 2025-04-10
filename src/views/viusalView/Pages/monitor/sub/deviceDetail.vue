<template>
  <div class="detail">
    <!-- 导航栏 -->
    <div class="detail_nav">
      <el-button type="primary" class="return_btn" @click="handleReturn">
        <el-icon>
          <Back />
        </el-icon>返回
      </el-button>
    </div>

    <!-- 主要内容区域 -->
    <div class="detail_main">
      <!-- 内容介绍 -->
      <div class="detail_content">
        <h3>设备状态</h3>
        <p style="margin-bottom: 20px; font-weight: 600">
          <span>{{ Details.id == '' ? 'NULL' : Details.id }}</span>
        </p>
        <p>
          设备名称: <span>{{ Details.name == '' ? 'NULL' : Details.name }}</span>
        </p>
        <p>
          当前设备运行状态: <span>{{ Details.status == '' ? 'NULL' : Details.status }}</span>
        </p>
        <p>
          设备创建时间: <span>{{ Details.create_time == '' ? 'NULL' : Details.create_time }}</span>
        </p>
        <p>
          最后更新时间:
          <span>{{ Details.last_update_time == '' ? 'NULL' : Details.last_update_time }}</span>
        </p>
        <p>
          设备IP地址: <span>{{ Details.ip == '' ? 'NULL' : Details.ip }}</span>
        </p>
        <p>
          设备地址: <span>{{ Details.address == '' ? 'NULL' : Details.address }}</span>
        </p>
        <p>
          设备出厂码: <span>{{ Details.EFC == '' ? 'NULL' : Details.EFC }}</span>
        </p>
      </div>

      <!-- 信息展示 -->
      <div class="detail_information">
        <h3>数据区域</h3>
        <div class="chart-container">
          <!-- 这里可以放置图表组件 -->
          <div class="testView">
            <h2>MQTT 接收测试</h2>
            <button @click="open_MQTT_Client">点击开启MQTT客户端</button>
            <button @click="close_MQTT_Client">点击关闭MQTT客户端</button>
            <br>
            <br>
            <button @click="TurnOnLed_MQTT">打开LED</button>
            <button @click="TurnOffLed_MQTT">关闭LED</button>
            <button @click="TurnBlinkLed_MQTT">闪烁LED</button>
            <br>
            <h2>LED状态:{{ led_status }}</h2>
            <br>
            <button @click="GetDataSC7A20_MQTT">获取姿态</button>
            <button @click="CalibrateSC7A20_MQTT">自调零</button>
            <h2>X轴斜率:{{ object_status.slopex }}</h2>
            <h2>Y轴斜率:{{ object_status.slopey }}</h2>
            <h2>Z轴斜率:{{ object_status.slopez }}</h2>
          </div>
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
import { onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import request from '@/request'
import type { databaseReturn, DeviceType } from '@/types/Monitor'

const router = useRouter()
const route = useRoute()
const handleReturn = () => {
  router.push('/monitor')
}

const Details = reactive<DeviceType>({
  name: '',
  id: '',
  status: '',
  ip: '',
  address: '',
  last_update_time: '',
  create_time: '',
  EFC: '',
})

const Page_Init = async () => {
  const params = reactive<Record<string, number | string>>({
    limit: 1,
    skip: 0,
  })
  params.id = (route.params.id as string) ?? ''
  const result = await request.get<databaseReturn>('/monitor/db/find', { params })
  const DetailsResponse = result.data
  const DetailsDetail = DetailsResponse.data
  if (DetailsDetail.result) {
    // 赋值给详情
    Object.assign(Details, DetailsDetail.data[0])
  }
}

// 访问API获取设备详情
onMounted(async () => {
  await Page_Init()
  console.log('构建DeviceDetail组件')
})

import { ref } from 'vue';
import { type MqttResponseSC7A20 } from "./Response"

const led_status = ref('无');
const object_status = reactive({ slopex: 0, slopey: 0, slopez: 0 });

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

// 开启LED
const TurnOnLed_MQTT = () => {
  request.get('/mqtt/led/on').then((res) => {
    led_status.value = res.data.tips
  })
}

//关闭LED
const TurnOffLed_MQTT = () => {
  request.get('/mqtt/led/off').then((res) => {
    led_status.value = res.data.tips
  })
}

// LED闪烁
const TurnBlinkLed_MQTT = () => {
  request.get('/mqtt/led/blink').then((res) => {
    led_status.value = res.data.tips
  })
}

// 获取姿态
const GetDataSC7A20_MQTT = () => {
  request.get<MqttResponseSC7A20>('/mqtt/sc7a20/getdata').then((res) => {
    const Result = res.data

    if (Result.result) {
      const result = Result.data
      console.log(result);

      try {
        const slopex = result.x;
        const slopey = result.y;
        const slopez = result.z;
        object_status.slopex = slopex;
        object_status.slopey = slopey;
        object_status.slopez = slopez;
      } catch (e) {
        alert(e)
      }
    }
    else {
      alert(Result.tips)
    }
  })
}

// 自调零
const CalibrateSC7A20_MQTT = () => {
  request.get('/mqtt/sc7a20/calibrate').then((res) => {
    console.log(res.data);
  })
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
    grid-template-columns: 1fr 3fr 1fr;
    /*3 列 */
    grid-template-rows: repeat(4);
    /*4 行 */
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

      span {
        user-select: text;
        font-size: 14px;
      }
    }

    /* 设备状态 */
    .detail_content {
      grid-row: 2 / 5;
      /* 2行 */
      grid-column: 1;
      /* 第1列 */
    }

    /* 可视化数据 */
    .detail_information {
      grid-row: span 4;
      /* 占据三行 */
      grid-column: 2;
      /* 第二列 */
      display: flex;
      flex-direction: column;
      flex: 1;

      .chart-container {
        min-height: 400px;
        /* 高度固定 */
        flex: 1;
        display: flex;
        align-items: start;
        justify-content: start;
        background-color: #f9fafc;
        border-radius: 6px;

        h2 {
          margin: 20px;
        }

        button {
          position: relative;
          margin: 10px;
          padding: 10px 22px;
          border-radius: 6px;
          border: none;
          color: #fff;
          cursor: pointer;
          background-color: #7d2ae8;
          transition: all 0.2s ease;
        }
      }
    }

    /* 消息列表 */
    .detail_messagebox {
      grid-row: span 3;
      /* 占据两行 */
      grid-column: 3;

      /* 第3列 */
      .message-list {
        max-height: 200px;
        overflow-y: auto;
      }
    }

    /* 操作面板 */
    .operation {
      grid-row: 4;
      /*占据两行*/
      grid-column: 3;
      /* 第3列 */
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
