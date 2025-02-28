<template>
  <div class="visual-view">
    <div class="container">
      <el-aside class="aside" direction="vertical" :class="[isexpand ? 'expand' : '']">
        <div class="icon-box">
          <!-- logo -->
          <img class="icon" src="/icon.png" alt="" />
          <!-- logo Descrpition -->
          <p class="description">仪表盘</p>
        </div>
        <div class="select-menu">
          <MenuComponent :isexpand="isexpand" ref="menuRef" />
        </div>
        <div class="footer">
          <i
            class="iconfont icon-toggle-right"
            id="toggle-btn"
            ref="toggle_btn"
            @click="Toggle_Btn(toggle_btn as HTMLElement)"
          ></i>
        </div>
      </el-aside>
      <el-container id="main-container" direction="vertical">
        <header class="nav">
          <span class="title">{{ menuRef?.MenuTitle }}</span>
          <div class="content">
            <el-tooltip content="消息" placement="bottom">
              <i class="iconfont icon-email"></i>
            </el-tooltip>
            <el-tooltip content="帮助" placement="bottom">
              <i class="iconfont icon-help"></i>
            </el-tooltip>
            <el-tooltip content="设置" placement="bottom">
              <i class="iconfont icon-setting"></i>
            </el-tooltip>
            <el-dropdown placement="bottom">
              <div class="avatar">
                <el-avatar size="small" src="/avatar.jpeg"></el-avatar> <span>username</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户管理</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </header>
        <main class="main">
          <router-view />
        </main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MenuComponent from './Components/menu/MenuComponent.vue'

const isexpand = ref(false)
const toggle_btn = ref<HTMLElement | null>(null)
const menuRef = ref<InstanceType<typeof MenuComponent> | null>(null)
const router = useRouter()

const Toggle_Btn = (i: HTMLElement) => {
  i.classList.toggle('expand')
  isexpand.value = !isexpand.value
}

watch(
  () => menuRef.value?.MenuIndex,
  newValue => {
    router.push(newValue ?? '/')
  }
)

onMounted(() => {
  // * 初始化=>监控页面
  router.push(menuRef.value?.MenuIndex ?? 'monitor')
})
</script>
<style lang="less" scoped>
@import url(/iconfont/iconfont.css);
@base-font-color: #ffffff;
@base-font-size: 14px;
@base-background-color: #071927;
@aside-background-color: @base-background-color;
@aside-font-color: @base-font-color;
@nav-background-color: @base-background-color;
@nav-font-color: @base-font-color;
@main-background-color: @base-background-color;
@main-font-color: @base-font-color;
@icon-box-height: 40px;

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
  width: 80px;
  min-width: 80px;
  height: 100%;
  background-color: @aside-background-color;
  color: @aside-font-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  transition: all 0.5s cubic-bezier(0.25, 0.09, 0.25, 1);

  &.expand {
    width: 200px;

    .icon-box {
      .icon {
        transform: translateX(35px);
      }

      .description {
        opacity: 1;
      }
    }
  }

  .icon-box {
    width: 100%;
    height: @icon-box-height;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;

    .icon {
      height: @icon-box-height;
      padding: 10px 0;
      transform: translateX(20px); // 40 - 40/2 - 10/2
      transition: all 0.3s ease-in-out;
    }

    .description {
      line-height: @icon-box-height;
      font-size: 18px;
      font-weight: 300;
      transform: translate(45px, 10px);
      opacity: 0;
      transition: all 0.6s ease-in-out;
    }
  }

  // 选择菜单
  .select-menu {
    width: 100%;
    height: 100%;
  }

  // footer
  .footer {
    width: 100%;
    height: auto;
    border-top: 1px solid #445469;
    padding: 5px 0;
    display: flex;
    justify-content: center;

    #toggle-btn {
      color: white;
      font-size: 21px;
      transition: all 0.3s ease-in-out;

      &:hover {
        cursor: pointer;
        color: green;
      }

      &.expand {
        transform: rotate(-180deg);
      }
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
  background-color: @nav-background-color;
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
  .content {
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
  }
}

.content {
  .iconfont {
    cursor: pointer;
    margin-right: 30px;
    font-size: 21px;
  }
  .avatar {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-avatar {
      margin-right: 10px;
    }
    span {
      color: white;
    }
  }
}

.main {
  width: 100%;
  display: flex;
  overflow-y: hidden;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 8px 8px 0px;
  justify-content: start;
  flex: 1;
}
</style>
