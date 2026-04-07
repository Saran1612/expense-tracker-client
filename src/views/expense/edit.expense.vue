<template>
  <Modal
    v-model="isVisible"
    title="Edit Expense"
    width="500px"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="expenseForm"
      :rules="formRules"
      label-position="top"
      class="expense-form"
    >
      <el-form-item label="Amount" prop="amount">
        <Input
          v-model="expenseForm.amount"
          type="number"
          placeholder="Enter amount"
          class="form-input"
        />
      </el-form-item>

      <el-form-item label="Note" prop="note">
        <Input
          v-model="expenseForm.note"
          type="text"
          placeholder="Enter note"
          class="form-input"
        />
      </el-form-item>

      <el-form-item label="Category" prop="category">
        <el-select
          v-model="expenseForm.category"
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

      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="expenseForm.date"
          type="date"
          placeholder="Select date"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
          class="form-date-picker"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="Tags">
        <el-select
          v-model="expenseForm.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Type and press enter to add tags"
          class="form-select"
          size
        >
        </el-select>
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
          Update
        </Button>
      </div>
    </el-form>
  </Modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElForm, ElFormItem, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { expenseApi } from '../../apis/expense-api.js'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useCategoryStore } from '../../stores/category-store.js'
import { useExpenseStore } from '../../stores/expense-store.js'
import Modal from '../../components/Modal.vue'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  expense: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['update:modelValue', 'close', 'success'])

const message = createMessageHelpers()
const categoryStore = useCategoryStore()
const expenseStore = useExpenseStore()

const formRef = ref(null)
const submitting = ref(false)

const expenseForm = ref({
  amount: '',
  note: '',
  category: '',
  date: '',
  tags: []
})

const formRules = {
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
  ],
  note: [
    { required: true, message: 'Note is required', trigger: 'blur' }
  ],
  category: [
    { required: true, message: 'Category is required', trigger: 'change' }
  ],
  date: [
    { required: true, message: 'Date is required', trigger: 'change' }
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

// Watch for modal opening to fetch categories
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    resetForm()
    categoryStore.fetchCategories()
    // Clear form validation
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }
})

// Watch for expense changes to populate form
watch(() => props.expense, (newExpense) => {
  if (newExpense && props.modelValue) {
    // Format date for date picker (YYYY-MM-DD format)
    let formattedDate = ''
    if (newExpense.date) {
      const date = new Date(newExpense.date)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      formattedDate = `${year}-${month}-${day}`
    }
    
    expenseForm.value = {
      amount: newExpense.amount?.toString() || '',
      note: newExpense.note || '',
      category: newExpense.category?._id || newExpense.category || '',
      date: formattedDate,
      tags: newExpense.tags || []
    }
  }
}, { immediate: true })

const resetForm = () => {
  expenseForm.value = {
    amount: '',
    note: '',
    category: '',
    date: '',
    tags: []
  }
}

const handleClose = () => {
  isVisible.value = false
}

const handleSubmit = async () => {
  if (!formRef.value) return

  if (!props.expense?._id) {
    message.error('Expense ID is required')
    return
  }

  // Validate form
  try {
    await formRef.value.validate()
    submitExpense()
  } catch (error) {
    // Validation failed, error is automatically handled by Element Plus
    console.log('Form validation failed:', error)
  }
}

const submitExpense = async () => {
  submitting.value = true
  try {
    const expenseData = {
      amount: parseFloat(expenseForm.value.amount),
      note: expenseForm.value.note,
      category: expenseForm.value.category,
      date: expenseForm.value.date || new Date().toISOString(),
      tags: Array.isArray(expenseForm.value.tags) ? expenseForm.value.tags : []
    }

    const response = await expenseApi.updateExpense(props.expense._id, expenseData)
    console.log('responseasdadeditor', response)
    if (response && response?.status === 200) {
      message.success(response?.data?.message || 'Expense updated successfully')
      handleClose()
      await expenseStore.fetchExpenses()
      emits('success')
    } else {
      message.error(response?.data?.message || 'Failed to update expense')
    }
  } catch (error) {
    message.error(error?.response?.data?.message || 'Failed to update expense')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.expense-form :deep(.el-form-item__label) {
  font-size: var(--text-content);
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.expense-form :deep(.el-form-item) {
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

.form-date-picker {
  width: 100%;
}

.form-date-picker :deep(.el-input__wrapper) {
  border-radius: 6px !important;
  border: 1px solid var(--color-primary) !important;
  transition: all 0.2s ease !important;
  background-color: #FFFFFF !important;
  padding: 1px 11px !important;
  box-shadow: none !important;
  min-height: 48px !important;
}

.form-date-picker :deep(.el-input__wrapper:hover) {
  border-color: var(--color-primary) !important;
}

.form-date-picker :deep(.el-input.is-focus .el-input__wrapper) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 3px rgba(181, 130, 140, 0.1) !important;
  outline: none !important;
}

.form-date-picker :deep(.el-input__inner) {
  color: #1F2937 !important;
  font-size: var(--text-description) !important;
  line-height: 1.5 !important;
  height: auto !important;
  min-height: 46px !important;
}

.form-date-picker :deep(.el-input__inner::placeholder) {
  color: #7D8D86 !important;
  opacity: 1 !important;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}
</style>
