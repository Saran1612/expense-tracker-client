<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: null
  },
  change: {
    type: String,
    default: ''
  },
  changeType: {
    type: String,
    default: 'neutral', // 'positive', 'negative', 'neutral'
    validator: (value) => ['positive', 'negative', 'neutral'].includes(value)
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

const handleClick = () => {
  if (props.clickable) {
    emits('click')
  }
}

const formatValue = (val) => {
  if (typeof val === 'number') {
    return val.toLocaleString()
  }
  return val
}
</script>

<template>
  <div 
    class="metric-card" 
    :class="{ 'clickable': clickable }"
    @click="handleClick"
  >
    <div class="card-header">
      <div class="icon-wrapper" v-if="icon">
        <component :is="icon" :size="22" class="card-icon" />
      </div>
      <slot name="header"></slot>
    </div>
    
    <div class="card-content">
      <div v-if="label" class="card-label">{{ label }}</div>
      <div v-if="title" class="card-title">{{ title }}</div>
      <div class="card-value-wrapper">
        <div class="card-value">{{ formatValue(value) }}</div>
        <div 
          v-if="change" 
          class="card-change"
          :class="`change-${changeType}`"
        >
          {{ change }}
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.metric-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--color-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.metric-card.clickable {
  cursor: pointer;
}

.metric-card.clickable:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.icon-wrapper {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 4px;
  background-color: var(--color-primary-background-light);

}

.card-icon {
  color: var(--color-primary);
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-label {
  font-size: var(--text-content);
  color: #6B7280;
  margin-bottom: 4px;
  text-align: left;
  text-transform: uppercase;
}

.card-title {
  font-size: var(--text-content);
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
}

.card-value-wrapper {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.card-value {
  font-size: var(--text-header);
  font-weight: 700;
  color: #374151;
  line-height: 1.2;
}

.card-change {
  font-size: var(--text-content);
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.change-positive {
  color: #10B981;
}

.change-negative {
  color: #EF4444;
}

.change-neutral {
  color: #6B7280;
}
</style>

