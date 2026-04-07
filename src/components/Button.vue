<script setup>
import { computed } from 'vue'
import { ElButton } from 'element-plus'

const props = defineProps({
  // Button text
  text: {
    type: String,
    default: 'Button'
  },
  // Button type: 'primary' or 'secondary' ONLY
  type: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  // Icon to display inside button
  icon: {
    type: Object,
    default: null
  },
  // Button size: large, default, small
  size: {
    type: String,
    default: 'default'
  },
  // Additional classes to apply
  className: {
    type: String,
    default: ''
  },
  // Whether the button is disabled
  disabled: {
    type: Boolean,
    default: false
  },
  // Whether to show loading state
  loading: {
    type: Boolean,
    default: false
  },
  // Button HTML type (submit, reset, button)
  htmlType: {
    type: String,
    default: 'button'
  },
  circle: {
    default: false
  }
})

const emits = defineEmits(['click'])

const handleClick = (e) => {
  emits('click', e)
}

// Computed class based on button type
const buttonTypeClass = computed(() => {
  return props.type === 'primary' ? 'btn-primary' : 'btn-secondary'
})
</script>

<template>
  <ElButton :size="size" :disabled="disabled" :loading="loading" :native-type="htmlType" class="custom-button"
    :class="[buttonTypeClass, className]" @click="handleClick" :circle="circle">
    <template #icon v-if="icon">
      <component :is="icon" :size="16" />
    </template>
    <slot>{{ text }}</slot>
  </ElButton>
</template>

<style scoped lang="scss">
.custom-button {
  border-radius: 4px !important;
  padding: 18px 30px !important;
  transition: all 0.2s ease !important;
  font-size: var(--text-description) !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  text-transform: uppercase !important;
}

/* PRIMARY button style */
.btn-primary {
  color: var(--color-secondary) !important;
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover) !important;
  border-color: var(--color-primary-hover) !important;
}

.btn-primary:active {
  background-color: var(--color-primary-active) !important;
  border-color: var(--color-primary-active) !important;
}

/* SECONDARY button style */
.btn-secondary {
  color: var(--color-primary) !important;
  background-color: var(--color-secondary) !important;
  border: 1px solid var(--color-primary) !important;
}

.btn-secondary:hover {
  color: var(--color-primary) !important;
  background-color: var(--color-secondary) !important;
  border: 1px solid var(--color-primary) !important;
  opacity: 0.9;
}

.btn-secondary:active {
  color: var(--color-primary) !important;
  background-color: var(--color-secondary) !important;
  border: 1px solid var(--color-primary) !important;
  opacity: 0.8;
}

.custom-button :deep(.lucide-icon) {
  margin-right: 4px;
}
</style>
