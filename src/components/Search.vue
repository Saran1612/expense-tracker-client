<script setup>
import { Search as SearchIcon } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  className: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue', 'search', 'clear'])

const handleInput = (value) => {
  emits('update:modelValue', value)
  emits('search', value)
}

const handleClear = () => {
  emits('clear')
}
</script>

<template>
  <el-input :model-value="modelValue" :placeholder="placeholder" class="custom-search" :class="className" clearable
    @update:model-value="handleInput" @clear="handleClear">
    <template #prefix>
      <SearchIcon :size="18" color="#9CA3AF" />
    </template>
  </el-input>
</template>

<style scoped lang="scss">
.custom-search :deep(.el-input__wrapper) {
  border-radius: 6px !important;
  border: 1px solid var(--color-primary) !important;
  transition: all 0.2s ease !important;
  background-color: #FFFFFF !important;
  padding: 1px 11px !important;
  box-shadow: none !important;
  min-height: 40px !important;
}

.custom-search :deep(.el-input__wrapper:hover) {
  border-color: #9CA3AF !important;
}

.custom-search :deep(.el-input.is-focus .el-input__wrapper) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(151, 168, 122, 0.1) !important;
  outline: none !important;
}

.custom-search :deep(.el-input__inner) {
  color: #1F2937 !important;
  font-size: var(--text-content) !important;
  line-height: 1.5 !important;
}

.custom-search :deep(.el-input__inner::placeholder) {
  color: #9CA3AF !important;
  opacity: 1 !important;
}

.custom-search :deep(.el-input__prefix) {
  color: #9CA3AF !important;
  margin-left: 8px;
  display: flex;
  align-items: center;
}
</style>
