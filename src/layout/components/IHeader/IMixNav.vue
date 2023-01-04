<script setup lang="ts">
import Search from "../search/index.vue";
import Notice from "../notice/index.vue";
import { useNav } from "@/layout/hooks/useNav";
import { nextTick, onMounted, ref, toRaw } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { usePermissionStoreHook } from "@/store/modules/permission";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import IMixHeaderMenu from "@/layout/components/IHeader/IMixHeaderMenu.vue";

const menuRef = ref();
// const defaultActive = ref(null);

const { device, logout, onPanel, applicationSelect, username, avatarsStyle } =
  useNav();

onMounted(() => {});

nextTick(() => {
  menuRef.value?.handleResize();
});
</script>

<template>
  <div
    v-if="device !== 'mobile'"
    class="horizontal-header"
    v-loading="usePermissionStoreHook().applicationList.length === 0"
  >
<!--    <i-mix-header-menu />-->
    <el-menu
      ref="menuRef"
      mode="horizontal"
      class="horizontal-header-menu"
      @select="applicationName => applicationSelect(applicationName)"
    >
      <el-menu-item
        v-for="app in usePermissionStoreHook().applicationList"
        :key="app.name"
        :index="app.name"
      >
        <template #title>
          <span class="select-none">{{ app.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <Search />
      <!-- 通知 -->
      <Notice id="header-notice" />
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover select-none">
          <img
            src="https://avatars.githubusercontent.com/u/44761321?v=4"
            :style="avatarsStyle"
          />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline
                :icon="LogoutCircleRLine"
                style="margin: 5px"
              />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span
        class="set-icon navbar-bg-hover"
        title="打开项目配置"
        @click="onPanel"
      >
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.logout {
  max-width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    min-width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
  }
}
</style>
