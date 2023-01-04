<script setup lang="ts">
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PropType, toRaw } from "vue";

defineOptions({
  name: "IMixMenuIcon"
});

const props = defineProps({ route: { type: Object as PropType<unknown> } });
</script>

<template>
  <div
    v-if="toRaw(props.route.meta.icon)"
    :class="['sub-menu-icon', props.route.meta.icon]"
  >
    <component
      :is="useRenderIcon(props.route.meta && toRaw(props.route.meta.icon))"
    />
  </div>
  <span class="select-none">{{ props.route.meta.title }}</span>
  <FontIcon
    v-if="props.route.meta.extraIcon"
    width="30px"
    height="30px"
    style="position: absolute; right: 10px"
    :icon="props.route.meta.extraIcon.name"
    :svg="props.route.meta.extraIcon.svg"
  />
</template>
