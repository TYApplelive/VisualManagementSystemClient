<template>
    <div class="menu">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
            <el-menu-item index="1">
                <el-icon>
                    <location />
                </el-icon>
                <span>状态</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <Menu />
                </el-icon>
                <span>统计</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon>
                    <document />
                </el-icon>
                <span>测试</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <span>设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import emitter from '@/utils/emitter';

const handleSelect = (key: string) => {
    emitter.emit('menu-select', key);
}

</script>
<style lang="less" scoped>
.menu {
    width: 100%;
    height: 100%;
    background-color: #e9e9e9;
}

.el-menu {
    height: 100%;
}
</style>
