<script setup>
defineProps({
  type: {
    type: String,
    default: 'info', // 'info', 'success', 'warning'
    validator: (value) => ['info', 'success', 'warning'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="insight-card" :class="`insight-${type}`">
    <div class="insight-icon-wrapper">
      <component v-if="icon" :is="icon" :size="18" class="insight-icon" />
    </div>
    <div class="insight-message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.insight-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.insight-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.insight-icon-wrapper {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.insight-icon {
  display: block;
}

.insight-info .insight-icon-wrapper {
  background-color: rgba(59, 130, 246, 0.1);
}

.insight-info .insight-icon {
  color: #3B82F6;
}

.insight-success .insight-icon-wrapper {
  background-color: rgba(16, 185, 129, 0.1);
}

.insight-success .insight-icon {
  color: #10B981;
}

.insight-warning .insight-icon-wrapper {
  background-color: rgba(245, 158, 11, 0.1);
}

.insight-warning .insight-icon {
  color: #F59E0B;
}

.insight-message {
  flex: 1;
  font-size: var(--text-content);
  color: #374151;
  line-height: 1.5;
}
</style>

