<script setup>
import { computed } from 'vue'
import { ElDialog } from 'element-plus'

const props = defineProps({
  // Modal title
  title: {
    type: String,
    default: 'Modal Title'
  },
  // Whether the modal is visible
  modelValue: {
    type: Boolean,
    default: false
  },
  // Modal width
  width: {
    type: String,
    default: '500px'
  },
  // Whether to show close icon
  showClose: {
    type: Boolean,
    default: true
  },
  // Whether to close modal when clicking mask
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  // Whether to close modal when pressing ESC
  closeOnPressEscape: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue', 'close'])

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
    if (!value) {
      emits('close')
    }
  }
})

const handleClose = () => {
  isVisible.value = false
}
</script>

<template>
  <ElDialog
    v-model="isVisible"
    :title="title"
    :width="width"
    :show-close="showClose"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    class="custom-modal"
    style="padding: 24px 30px 24px 30px !important;"
    @close="handleClose"
  >
    <slot />
  </ElDialog>
</template>

<style lang="scss">

.custom-modal :deep(.el-dialog__header) {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #E5E7EB;
}

.custom-modal :deep(.el-dialog__title) {
  font-size: var(--text-header);
  font-weight: 600;
  color: var(--text-secondary);
}

.custom-modal :deep(.el-dialog__body) {
  padding: 20px;
  color: var(--text-secondary);
}

.custom-modal :deep(.el-dialog__headerbtn) {
  top: 20px;
  right: 20px;
}

.custom-modal :deep(.el-dialog__close) {
  color: var(--text-tertiary);
  font-size: 18px;
}

.custom-modal :deep(.el-dialog__close:hover) {
  color: var(--color-primary);
}
</style>

