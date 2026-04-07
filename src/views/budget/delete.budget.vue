<template>
  <Modal
    v-model="isVisible"
    title="Delete Budget"
    width="400px"
    @close="handleClose"
  >
    <div class="delete-confirmation">
      <p class="delete-text">
        Are you sure you want to delete this budget?
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
import { budgetApi } from '../../apis/budget-api.js'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useBudgetStore } from '../../stores/budget-store.js'
import Modal from '../../components/Modal.vue'
import Button from '../../components/Button.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  budget: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['update:modelValue', 'close', 'success'])

const message = createMessageHelpers()
const budgetStore = useBudgetStore()

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
  if (!props.budget?._id) {
    message.error('Budget ID is required')
    return
  }

  deleting.value = true
  try {
    const response = await budgetApi.deleteBudget(props.budget._id)
    console.log(response, "responseofdeletebudget")
    if (response && response?.status === 200) {
      message.success(response?.data?.message || 'Budget deleted successfully')
      handleClose()
      await budgetStore.fetchBudgets()
      emits('success')
    } else {
      message.error(response?.data?.message || 'Failed to delete budget')
    }
  } catch (error) {
    message.error(error?.response?.data?.message || 'Failed to delete budget')
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
