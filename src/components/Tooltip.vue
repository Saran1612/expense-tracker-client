<script setup>
import { ElTooltip } from 'element-plus'

const props = defineProps({
  // Tooltip content/text
  content: {
    type: String,
    default: ''
  },
  // Tooltip placement: top, bottom, left, right, etc.
  placement: {
    type: String,
    default: 'right',
    validator: (value) => [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end'
    ].includes(value)
  },
  // Tooltip effect: dark or light
  effect: {
    type: String,
    default: 'light',
    validator: (value) => ['dark', 'light'].includes(value)
  },
  // Whether to show tooltip
  disabled: {
    type: Boolean,
    default: false
  },
  // Tooltip offset
  offset: {
    type: Number,
    default: 0
  },
  // Transition animation name
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  // Show arrow
  showArrow: {
    type: Boolean,
    default: false
  },
  // Additional classes
  className: {
    type: String,
    default: ''
  },
  // Popper className (applied to the tooltip popper element)
  popperClassName: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <ElTooltip
    :content="content"
    :placement="placement"
    :effect="effect"
    :disabled="disabled"
    :offset="offset"
    :transition="transition"
    :show-arrow="showArrow"
    :class="className"
    :popper-class="'menu-tooltip ' + popperClassName"
  >
    <template #default>
      <slot></slot>
    </template>
  </ElTooltip>
</template>

<style lang="scss">
// Custom tooltip styles
.menu-tooltip {
  font-size: var(--text-content) !important;
  font-weight: 500 !important;
  padding: 8px 12px !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  max-width: 200px !important;
  word-wrap: break-word !important;
  line-height: 1.4 !important;
}
</style>

