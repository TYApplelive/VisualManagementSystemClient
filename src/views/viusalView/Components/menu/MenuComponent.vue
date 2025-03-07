<template>
  <div class="MenuCompnet">
    <el-menu
      :default-active="activeMenu"
      mode="vertical"
      :class="[iscollapse ? '' : 'expand']"
      :collapse="iscollapse"
      @select="handleMenuSelect"
    >
      <el-menu-item index="monitor">
        <el-icon>
          <Monitor />
        </el-icon>
        <template #title>设备监控</template>
      </el-menu-item>
      <el-menu-item index="personal">
        <el-icon>
          <User />
        </el-icon>
        <template #title>个人资料</template>
      </el-menu-item>
      <el-menu-item index="network">
        <el-icon>
          <i class="iconfont icon-wifi" style="font-size: 22px; color: white"></i>
        </el-icon>
        <template #title>网络检测</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 默认monitor子组件
const activeMenu = ref('monitor')

// 菜单折叠
const iscollapse = ref(true)
const MenuTitle = ref('设备监控')
const MenuIndex = ref('monitor')
const handleMenuSelect = (index: string) => {
  MenuIndex.value = '/' + index // 赋值菜单选项
  switch (index) {
    case 'monitor':
      MenuTitle.value = '设备监控'
      break
    case 'personal':
      MenuTitle.value = '个人资料'
      break
    case 'network':
      MenuTitle.value = '网络检测'
      break
  }
}

watch(
  () => router.currentRoute.value.path,
  newValue => {
    if (newValue.startsWith('/monitor/')) {
      activeMenu.value = 'monitor'
      newValue = newValue.replace('/', '')
      handleMenuSelect(newValue)
      MenuTitle.value = '设备监控' // 保持设备监控不变
    } else {
      newValue = newValue.replace('/', '')
      handleMenuSelect(newValue)
      activeMenu.value = newValue
    }
  },
  { immediate: true }
)

// 接收父组件传递的值
const props = defineProps({
  isexpand: Boolean,
})

// 监听是否展开
watch(
  () => props.isexpand,
  newValue => {
    // 如果要展开，那么iscollapse为false
    iscollapse.value = !newValue
  }
)

//暴露值给父组件
defineExpose({ MenuTitle, MenuIndex })
</script>

<style lang="less" scoped>
@import url(/iconfont/iconfont.css);
@base-font-color: #ffffff;
@base-font-size: 14px;
@base-background-color: #071927;

.MenuCompnet {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}

.el-menu {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-wrap: nowrap;

  &.expand {
    width: 200px;
    .el-icon {
      display: none;
    }
  }

  .el-menu-item {
    width: 80%;
    color: @base-font-color;
    border-radius: 10px;
    margin-bottom: 5px;
  }

  .el-menu-item.is-active {
    background: #1f303c;
  }

  .el-menu-item:hover {
    cursor: pointer;
    background: #1f303c;
  }
}
</style>
