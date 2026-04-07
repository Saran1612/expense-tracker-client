<template>
  <Modal
    v-model="isVisible"
    title="Add Budget"
    width="500px"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="budgetForm"
      :rules="formRules"
      label-position="top"
      class="budget-form"
    >
      <el-form-item label="Category" prop="category">
        <el-select
          v-model="budgetForm.category"
          filterable
          placeholder="Select category"
          class="form-select"
          :loading="categoryStore.loading"
        >
          <el-option
            v-for="cat in categoryStore.categories"
            :key="cat._id || cat.id"
            :label="cat.name"
            :value="cat._id || cat.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Budget Amount" prop="amount">
        <Input
          v-model="budgetForm.amount"
          type="number"
          placeholder="Enter budget amount"
          class="form-input"
        />
      </el-form-item>

      <div class="form-actions">
        <Button
          type="secondary"
          @click="handleClose"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          @click="handleSubmit"
          :loading="submitting"
        >
          Confirm
        </Button>
      </div>
    </el-form>
  </Modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElForm, ElFormItem, ElSelect, ElOption } from 'element-plus'
import { budgetApi } from '../../apis/budget-api.js'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useBudgetStore } from '../../stores/budget-store.js'
import { useCategoryStore } from '../../stores/category-store.js'
import Modal from '../../components/Modal.vue'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'close', 'success'])

const message = createMessageHelpers()
const budgetStore = useBudgetStore()
const categoryStore = useCategoryStore()

const formRef = ref(null)
const submitting = ref(false)

const budgetForm = ref({
  category: '',
  amount: ''
})

const formRules = {
  category: [
    { required: true, message: 'Category is required', trigger: 'change' }
  ],
  amount: [
    { required: true, message: 'Amount is required', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('Amount is required'))
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          callback(new Error('Amount must be a positive number'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
}

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
    if (!value) {
      emits('close')
      resetForm()
    }
  }
})

// Reset form when modal opens
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    resetForm()
    categoryStore.fetchCategories()
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
})

const resetForm = () => {
  budgetForm.value = {
    category: '',
    amount: ''
  }
}

const handleClose = () => {
  isVisible.value = false
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    await submitBudget()
  } catch (error) {
    console.log('Form validation failed:', error)
  }
}

const submitBudget = async () => {
  submitting.value = true
  try {
    const budgetData = {
      amount: parseFloat(budgetForm.value.amount),
      category: budgetForm.value.category
    }
    
    const response = await budgetApi.createBudget(budgetData)
    if (response && response?.status === 200) {
      message.success(response?.data?.message || 'Budget created successfully')
      handleClose()
      await budgetStore.fetchBudgets()
      emits('success')
    } else {
      message.error(response?.data?.message || 'Failed to create budget')
    }
  } catch (error) {
    message.error(error?.response?.data?.message || 'Failed to create budget')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.budget-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.budget-form :deep(.el-form-item__label) {
  font-size: var(--text-content);
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.budget-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.form-input {
  width: 100%;
}

.form-select {
  width: 100%;
}

.form-select :deep(.el-select__wrapper) {
  border-radius: 6px;
  border: 1px solid var(--color-primary);
  min-height: 48px;
}

.form-select :deep(.el-select__wrapper:hover) {
  border-color: var(--color-primary);
}

.form-select :deep(.el-select.is-focused .el-select__wrapper) {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(181, 130, 140, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
</style>
