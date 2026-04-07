<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    default: null
  },
  iconColor: {
    type: String,
    default: 'var(--color-primary)'
  },
  dangerZone: {
    type: Boolean,
    default: false
  }
})

const sectionClass = computed(() => {
  return props.dangerZone ? 'danger-zone-section' : ''
})
</script>

<template>
  <div class="settings-section" :class="sectionClass">
    <div class="section-header">
      <div class="section-icon-wrapper">
        <component v-if="icon" :is="icon" :size="20" class="section-icon" :style="{ color: iconColor }" />
      </div>
      <h3 class="section-title" :style="{ color: props.dangerZone ? '#EF4444' : '#374151' }">{{ title }}</h3>
    </div>
    <div class="section-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-section {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--color-primary);
  margin-bottom: 24px;
}

.danger-zone-section {
  border-color: #EF4444;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: var(--color-primary-background-light);
}

.section-icon {
  display: block;
  flex-shrink: 0;
}

.section-title {
  font-size: var(--text-header);
  font-weight: 600;
  color: #374151;
  margin: 0;
  line-height: 1.2;
}

.section-content {
  width: 100%;
}
</style>
