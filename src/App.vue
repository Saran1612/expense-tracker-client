<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Layout from './components/Layout.vue'

const route = useRoute()

// Determine if current route uses workspace layout
const isWorkspaceLayout = computed(() => {
  return route.meta.layout === 'workspace'
})
</script>

<template>
  <!-- Workspace Layout (with sidebar) -->
  <Layout v-if="isWorkspaceLayout" />

  <!-- Auth Layout (without sidebar) -->
  <div v-else class="mx-auto px-4 w-full" style="height: calc(100vh - 100px);">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped></style>