// * 设备数据类型
export interface DeviceType {
  name: string
  id: string
  status: string
  ip: string
  address: string
  create_time?: string
  EFC?: string
}

// 设备更新query类型结构
export interface UpdateQueryDeviceType {
  findParam: Record<string, string>
  updateParam: DeviceType
}
