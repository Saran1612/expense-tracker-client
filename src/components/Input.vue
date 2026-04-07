<script setup>
const props = defineProps({
  // Input value (for v-model)
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // Input placeholder text
  placeholder: {
    type: String,
    default: ''
  },
  // Input type: text, password, email, number, etc.
  type: {
    type: String,
    default: 'text'
  },
  // Input size: large, default, small
  size: {
    type: String,
    default: 'default'
  },
  // Whether input is disabled
  disabled: {
    type: Boolean,
    default: false
  },
  // Whether input is readonly
  readonly: {
    type: Boolean,
    default: false
  },
  // Whether input is clearable
  clearable: {
    type: Boolean,
    default: true
  },
  // Whether input shows password visibility toggle (for password type)
  showPassword: {
    type: Boolean,
    default: true
  },
  // Additional classes to apply
  className: {
    type: String,
    default: ''
  },
  // Maximum length
  maxlength: {
    type: Number,
    default: undefined
  },
  // Minimum length
  minlength: {
    type: Number,
    default: undefined
  },
  // Autocomplete attribute
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'clear', 'keyup'])

const handleKeyup = (e) => {
  emits('keyup', e)
}

const handleUpdateValue = (value) => {
  emits('update:modelValue', value)
}

const handleFocus = (e) => {
  emits('focus', e)
}

const handleBlur = (e) => {
  emits('blur', e)
}

const handleInput = (value) => {
  emits('input', value)
}

const handleClear = () => {
  emits('clear')
}
</script>

<template>
  <el-input
    :model-value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :show-password="type === 'password' ? showPassword : false"
    :maxlength="maxlength"
    :minlength="minlength"
    :autocomplete="autocomplete"
    class="custom-input"
    :class="className"
    @update:model-value="handleUpdateValue"
    @focus="handleFocus"
    @blur="handleBlur"
    @input="handleInput"
    @clear="handleClear"
    @keyup="handleKeyup"
  />
</template>

<style scoped>
.custom-input :deep(.el-input__wrapper) {
  border-radius: 6px !important;
  border: 1px solid var(--color-primary) !important;
  transition: all 0.2s ease !important;
  background-color: #FFFFFF !important;
  padding: 1px 11px !important;
  box-shadow: none !important;
  min-height: 48px !important;
}

.custom-input :deep(.el-input--large .el-input__wrapper) {
  padding: 1px 15px !important;
  min-height: 52px !important;
}

.custom-input :deep(.el-input__wrapper:hover) {
  border-color: var(--color-primary) !important;
}

.custom-input :deep(.el-input.is-focus .el-input__wrapper) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
  outline: none !important;
}

.custom-input :deep(.el-input__inner) {
  color: #1F2937 !important;
  font-size: var(--text-description) !important;
  line-height: 1.5 !important;
  height: auto !important;
  min-height: 46px !important;
}

.custom-input :deep(.el-input--large .el-input__inner) {
  font-size: var(--text-description) !important;
  min-height: 50px !important;
}

.custom-input :deep(.el-input__inner::placeholder) {
  color: #7D8D86 !important;
  opacity: 1 !important;
}

.custom-input :deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #F3F4F6 !important;
  border-color: #D1D5DB !important;
  cursor: not-allowed !important;
}

.custom-input :deep(.el-input.is-disabled .el-input__inner) {
  color: #9CA3AF !important;
  cursor: not-allowed !important;
}

.custom-input :deep(.el-input__clear) {
  color: #6B7280 !important;
  transition: color 0.2s ease !important;
}

.custom-input :deep(.el-input__clear:hover) {
  color: var(--color-primary) !important;
}

.custom-input :deep(.el-input__password) {
  color: #6B7280 !important;
  transition: color 0.2s ease !important;
}

.custom-input :deep(.el-input__password:hover) {
  color: var(--color-primary) !important;
}
</style>

