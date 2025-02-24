<template>
    <div class="visual-main">
        <div class="common-layout">
            <el-container>
                <el-aside>
                    <menuComponent />
                </el-aside>
                <el-main>
                    <!-- 动态组件 -->
                    <contentComponent />
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import menuComponent from './c-menu/menu.vue'
// 内容页面
import contentComponent from './c-content/content.vue'

</script>
<style lang="less" scoped>
.visual-main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .common-layout {
        width: 100%;
        height: 100%;

        .el-container {
            width: 100%;
            height: 100%;

            .el-aside {
                height: 100%;
                background: var(--el-color-primary-light-8);
            }

            .el-main {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
