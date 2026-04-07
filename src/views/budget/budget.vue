<template>
  <div class="budget-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="page-title">Budget</h1>
        <p class="page-subtitle">Manage your monthly budgets by category</p>
      </div>
      <Button
        type="primary"
        :icon="Plus"
        @click="handleAddBudget"
        class="add-budget-btn"
      >
        Add Budget
      </Button>
    </div>

    <!-- Table Section -->
    <div class="table-section">
      <Table
        :data="budgets"
        :columns="budgetColumns"
        :loading="budgetStore.loading"
      >
        <template #category="{ row }">
          <div class="category-cell">
            <span v-if="row.category?.icon">{{ row.category.icon }}</span>
            <span class="category-name">{{ row.category?.name || 'N/A' }}</span>
          </div>
        </template>

        <template #amount="{ row }">
          <span class="amount-text">
            {{ formatAmount(row.amount) }}
          </span>
        </template>

        <template #totalSpent="{ row }">
          <span class="total-spent-text">
            {{ formatAmount(row.total_spent) }}
          </span>
        </template>

        <template #remaining="{ row }">
          <span :class="getRemainingClass(row)">
            {{ formatAmount(row.amount - row.total_spent) }}
          </span>
        </template>

        <template #period="{ row }">
          <span class="period-text">
            {{ formatPeriod(row.startDate, row.endDate) }}
          </span>
        </template>

        <template #actions="{ row }">
          <div class="actions-cell">
            <Trash2
              :size="18"
              class="action-icon delete-icon"
              @click.stop="handleDelete(row)"
            />
          </div>
        </template>
      </Table>
    </div>

    <!-- Add Budget Modal -->
    <AddBudget
      v-model="isAddModalVisible"
      @close="handleAddModalClose"
      @success="handleAddSuccess"
    />

    <!-- Delete Budget Modal -->
    <DeleteBudget
      v-model="isDeleteModalVisible"
      :budget="selectedBudget"
      @close="handleDeleteModalClose"
      @success="handleDeleteSuccess"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
import {
  Plus,
  Trash2
} from '@lucide/vue'
import { useBudgetStore } from '../../stores/budget-store.js'
import Button from '../../components/Button.vue'
import Table from '../../components/Table.vue'
import AddBudget from './add.budget.vue'
import DeleteBudget from './delete.budget.vue'

// Stores
const budgetStore = useBudgetStore()

// Modal state
const isAddModalVisible = ref(false)
const isDeleteModalVisible = ref(false)
const selectedBudget = ref(null)

const budgets = computed(() => budgetStore.budgets)

// Table columns configuration
const budgetColumns = [
  {
    prop: 'category',
    label: 'Category',
    minWidth: '200',
    slot: true
  },
  {
    prop: 'amount',
    label: 'Budget Amount',
    minWidth: '150',
    slot: true
  },
  {
    prop: 'totalSpent',
    label: 'Total Spent',
    minWidth: '150',
    slot: true
  },
  {
    prop: 'remaining',
    label: 'Remaining',
    minWidth: '150',
    slot: true
  },
  {
    prop: 'period',
    label: 'Period',
    minWidth: '200',
    slot: true
  },
  {
    prop: 'actions',
    label: 'Action',
    width: '100',
    slot: true
  }
]

const formatAmount = (amount) => {
  if (typeof amount === 'number') {
    return `${amount.toFixed(2)} ₹`
  }
  return amount || '0.00 ₹'
}

const formatPeriod = (startDate, endDate) => {
  if (!startDate || !endDate) return 'N/A'
  const start = moment(startDate).format('DD MMM')
  const end = moment(endDate).format('DD MMM YYYY')
  return `${start} - ${end}`
}

const getRemainingClass = (row) => {
  const remaining = row.amount - row.total_spent
  if (remaining < 0) {
    return 'remaining-text negative'
  } else if (remaining < row.amount * 0.2) {
    return 'remaining-text warning'
  }
  return 'remaining-text positive'
}

const handleAddBudget = () => {
  isAddModalVisible.value = true
}

const handleAddModalClose = () => {
  // Additional cleanup if needed
}

const handleAddSuccess = () => {
  // Additional logic if needed after successful add
}

const handleDelete = (budget) => {
  selectedBudget.value = budget
  isDeleteModalVisible.value = true
}

const handleDeleteModalClose = () => {
  selectedBudget.value = null
}

const handleDeleteSuccess = () => {
  // Additional logic if needed after successful delete
}

onMounted(() => {
  budgetStore.fetchBudgets()
})
</script>

<style scoped lang="scss">
.budget-page {
  width: 100%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.header-content {
  flex: 1;
  text-align: left;
}

.page-title {
  font-size: var(--text-header);
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: var(--text-content);
  color: var(--text-tertiary);
  margin: 0;
  line-height: 1.5;
}

.add-budget-btn {
  margin-left: 16px;
}

.table-section {
  width: 100%;
}

.category-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-name {
  font-size: var(--text-content);
  color: var(--text-secondary);
  font-weight: 500;
}

.amount-text {
  color: var(--text-secondary);
  font-size: var(--text-content);
  font-weight: 600;
}

.total-spent-text {
  color: var(--text-secondary);
  font-size: var(--text-content);
  font-weight: 500;
}

.remaining-text {
  font-size: var(--text-content);
  font-weight: 600;
  
  &.positive {
    color: #10B981;
  }
  
  &.warning {
    color: #F59E0B;
  }
  
  &.negative {
    color: #EF4444;
  }
}

.period-text {
  color: var(--text-secondary);
  font-size: var(--text-content);
}

.actions-cell {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: start;
}

.action-icon {
  color: var(--color-primary);
  cursor: pointer;
  transition: color 0.2s ease;
}

.action-icon:hover {
  color: var(--color-primary-hover);
}

.delete-icon:hover {
  color: #DC2626;
}
</style>
