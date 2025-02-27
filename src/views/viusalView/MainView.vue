<template>
  <div class="visual-main">
    <div class="common-layout">
      <el-container>
        <el-aside>
          <menuComponent />
        </el-aside>
        <el-main>
          <contentComponent />
        </el-main>
      </el-container>
    </div>
  </div>
</template>


<script setup lang="ts">
// 菜单栏
import menuComponent from './c-menu/menuComponent.vue'
// 内容页面
import contentComponent from './c-content/contentView.vue'

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
      display: flex;

      .el-aside {
        height: 100%;
        background: var(--el-color-primary-light-8);
        min-width: 200px;
        flex-shrink: 0;
      }

      .el-main {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
      }
    }
  }
}
</style>
