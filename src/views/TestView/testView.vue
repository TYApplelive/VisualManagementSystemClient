<template>
  <div class="testView">
    <h1>MQTT 接收测试</h1>
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
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import request from '@/request';
import { type MqttResponseSC7A20 } from "./type/Response"

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
button {
  margin-right: 10px;
}
</style>
