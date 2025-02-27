<template>
  <div class="visual-view">
    <div class="container">
      <el-aside class="aside" direction="vertical" :width="_aside_width">
        <div class="icon-box">
          <img class="icon" src="/icon.png" alt="">
        </div>
        <div class="select-menu">页面选择菜单</div>
      </el-aside>
      <el-container id="main-container" direction="vertical">
        <header class="nav">
          <span class="title">导航栏标题</span>
          <div class="content">上方导航栏</div>
        </header>
        <main class="main">
          <div class="main-cotent">内容显示区域</div>
        </main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const _aside_width = ref('200px')

</script>
<style lang="less" scoped>
@base-font-color : #FFFFFF;
@base-font-size: 14px;
@base-background-color: #071927;
@aside-background-color: @base-background-color;
@aside-font-color: @base-font-color;
@nav-background-color: @base-background-color;
@nav-font-color: @base-font-color;
@main-background-color: @base-background-color;
@main-font-color: @base-font-color;

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  user-select: none;
  font-size: @base-font-size;
}

.visual-view {
  width: 100%;
  height: 100%;
  background-color: #e7e7e7;
}

.container {
  width: 100%;
  min-width: 100vh; // 最小宽度
  height: 100%;
  background-color: #e9e9e9;
  display: flex;
  flex-wrap: nowrap; // 防止横向滚动
}

// 侧边栏样式
.aside {
  width: auto;
  height: 100%;
  background-color: @aside-background-color;
  color: @aside-font-color;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon-box {
    width: 40px;
    height: 40px;
    margin-bottom: 30px;

    .icon {
      width: 100%;
      padding: 10px 0;
    }
  }
}

// 主要内容展示区(nav + main)
#main-container {
  width: auto;
  height: 100%;
  min-width: 100vh;
  background-color: @main-background-color;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.nav {
  @height: 60px;

  width: auto;
  height: @height;
  min-width: 100vh;
  background-color: @nav-background-color ;
  color: @nav-font-color;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0 24px;

  // 导航栏标题
  .title {
    font-size: 22px;
    font-weight: 600;
    line-height: @height;
  }

  // 导航栏内容
  // .content {}
}

.main {
  width: auto;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin: 0 8px 8px 0px;
}
</style>
