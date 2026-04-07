<template>
{{ console.log(expense, "propsexpense") }}
  <Modal
    v-model="isVisible"
    title="Delete Expense"
    width="400px"
    @close="handleClose"
  >
    <div class="delete-confirmation">
      <p class="delete-text">
        Are you sure you want to delete this expense?
      </p>
      <div class="delete-actions">
        <Button
          type="secondary"
          @click="handleClose"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          @click="handleConfirm"
          :loading="deleting"
        >
          Confirm
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { expenseApi } from '../../apis/expense-api.js'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useExpenseStore } from '../../stores/expense-store.js'
import Modal from '../../components/Modal.vue'
import Button from '../../components/Button.vue'
import { useCategoryStore } from '../../stores/category-store.js'


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
const expenseStore = useExpenseStore()

const deleting = ref(false)

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

const handleConfirm = async () => {
  if (!props.expense?._id) {
    message.error('Expense ID is required')
    return
  }

  deleting.value = true
  try {
    const response = await expenseApi.deleteExpense(props.expense._id);
    console.log(response, "responseofdeleteexpense");
    if (response && response?.status === 200) {
      message.success(response?.data?.message || 'Expense deleted successfully')
      handleClose()
      await expenseStore.fetchExpenses()
      emits('success')
    } else {
      message.error(response?.data?.message || 'Failed to delete expense')
    }
  } catch (error) {
    message.error(error?.response?.data?.message || 'Failed to delete expense')
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped lang="scss">
.delete-confirmation {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0;
}

.delete-text {
  font-size: var(--text-content);
  color: var(--text-secondary);
  margin: 0;
  text-align: center;
}

.delete-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>
