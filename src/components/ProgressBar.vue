<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  showValue: {
    type: Boolean,
    default: true
  },
  formatValue: {
    type: Function,
    default: null
  }
})

const percentage = computed(() => {
  if (props.max === 0) return 0
  return Math.min((props.value / props.max) * 100, 100)
})

const displayValue = computed(() => {
  if (props.formatValue) {
    return props.formatValue(props.value)
  }
  return typeof props.value === 'number' ? `$${props.value.toFixed(2)}` : props.value
})
</script>

<template>
  <div class="progress-bar-wrapper">
    <div class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span v-if="showValue" class="progress-value">{{ displayValue }}</span>
    </div>
    <div class="progress-bar-container">
      <div
        class="progress-bar-fill"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar-wrapper {
  width: 100%;
  margin-bottom: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: var(--text-content);
  color: #374151;
  font-weight: 500;
}

.progress-value {
  font-size: var(--text-content);
  color: #374151;
  font-weight: 600;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style>

