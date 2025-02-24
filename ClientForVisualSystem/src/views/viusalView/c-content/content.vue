<template>
    <div class="content">
        <component :is="selectPage" />
    </div>
</template>

<script setup lang="ts">
import DeviceStatus from './contentView/DeviceStatus.vue';
import statistics from './contentView/Statistics.vue';

import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import emitter from '@/utils/emitter';

// 页面选择- 浅层响应式
const selectPage = shallowRef(Statistics)

onMounted(() => {
    emitter.on('menu-select', (key) => {

        switch (parseInt(key as string, 10)) {
            case 1:
                selectPage.value = DeviceStatus
                break;
            case 2:
                selectPage.value = Statistics
                break;
            default:
                ElMessageBox.alert('暂未开放', '提示', {
                    confirmButtonText: '确定',
                })
        }
    })
})

onUnmounted(() => {
    emitter.off('menu-select')
})

</script>
<style lang="less" scoped>
.content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
}
</style>
