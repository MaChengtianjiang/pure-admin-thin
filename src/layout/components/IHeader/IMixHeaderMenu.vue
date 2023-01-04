<script setup lang="ts">
// 简化顶部menu

import { usePermissionStoreHook } from "@/store/modules/permission";
import { useNav } from "@/layout/hooks/useNav";
import IMixMenuIcon from "@/layout/components/IHeader/IMixMenuIcon.vue";

const { resolvePath } = useNav();

defineOptions({
  name: "IMixHeaderMenu"
});
</script>

<template>
  <template
    v-for="route in usePermissionStoreHook().applicationList"
    :key="route.path"
  >
    <component
      :is="route.children ? 'el-sub-menu' : 'el-menu-item'"
      :index="route.path"
      :popper-offset="0"
    >
      <template #title>
        <i-mix-menu-icon :route="route" />
      </template>

      <template v-if="route.children && route.children.length">
        <el-menu-item
          v-for="child in route.children"
          :key="child.path"
          :index="child.path || child.redirect"
        >
          <template #title>
            <i-mix-menu-icon :route="child" />
          </template>
        </el-menu-item>
      </template>
    </component>
  </template>
</template>
