import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DeviceType } from '@/types/Monitor/device'

export const useDeviceDetailStore = defineStore('deviceDetail', () => {
  const deviceDetail = ref<DeviceType>({
    name: '',
    id: '',
    status: '',
    ip: '',
    address: '',
    create_time: '',
    EFC: '',
  })
  return {
    deviceDetail,
  }
})
