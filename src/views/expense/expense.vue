<template>
  <div class="expenses-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="page-title">Expenses</h1>
        <p class="page-subtitle">Track and manage all your expenses</p>
      </div>
      <Button
        type="primary"
        :icon="Plus"
        @click="handleAddExpense"
        class="add-expense-btn"
      >
        Add Expense
      </Button>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section">
      <div class="search-wrapper">
        <Search
          v-model="searchQuery"
          placeholder="Search expenses..."
          @search="handleSearch"
        />
      </div>
      <!-- <div class="filter-actions">
        <Button
          type="secondary"
          :icon="Filter"
          @click="handleFilter"
          class="filter-btn"
        >
          Filter
        </Button>
        <Button
          type="secondary"
          :icon="Download"
          @click="handleExport"
          class="export-btn"
        >
          Export CSV
        </Button>
      </div> -->
    </div>

    <!-- Table Section -->
    <div class="table-section">
      <Table
        :data="filteredExpenses"
        :columns="expenseColumns"
        :loading="expenseStore.loading"
        height="calc(100vh - 200px)"
      >
        <template #category="{ row }">
          <span class="category-pill">
            {{ row.category?.name || row.category }}
          </span>
        </template>

        <template #amount="{ row }">
          <span class="amount-text">
            {{ formatAmount(row.amount) }}
          </span>
        </template>

        <template #date="{ row }">
          <span class="date-text">
            {{ formatDate(row.date) }}
          </span>
        </template>

        <template #actions="{ row }">
          <div class="actions-cell">
            <Pencil
              :size="18"
              class="action-icon"
              @click.stop="handleEdit(row)"
            />
            <Trash2
              :size="18"
              class="action-icon"
              @click.stop="handleDelete(row)"
            />
          </div>
        </template>
      </Table>
    </div>

    <!-- Add Expense Modal -->
    <AddExpense
      v-model="isAddModalVisible"
      @close="handleAddModalClose"
      @success="handleAddSuccess"
    />

    <!-- Edit Expense Modal -->
    <EditExpense
      v-model="isEditModalVisible"
      :expense="selectedExpense"
      @close="handleEditModalClose"
      @success="handleEditSuccess"
    />

    <!-- Delete Expense Modal -->
    <DeleteExpense
      v-model="isDeleteModalVisible"
      :expense="selectedExpense"
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
  Filter,
  Download,
  Pencil,
  Trash2
} from '@lucide/vue'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useExpenseStore } from '../../stores/expense-store.js'
import { useCategoryStore } from '../../stores/category-store.js'
import Button from '../../components/Button.vue'
import Search from '../../components/Search.vue'
import Table from '../../components/Table.vue'
import AddExpense from './add.expense.vue'
import EditExpense from './edit.expense.vue'
import DeleteExpense from './delete.expense.vue'
import { expenseColumns } from '../../utils/columns.utils.js'

const formatDate = (dateString) => {
  if (!dateString) return ''
  return moment(dateString).format('DD-MM-YYYY')
}

const formatAmount = (amount) => {
  if (typeof amount === 'number') {
    return `${amount.toFixed(2)} ₹`
  }
  return amount
}

const message = createMessageHelpers()

// Stores
const expenseStore = useExpenseStore()
const categoryStore = useCategoryStore()

const searchQuery = ref('')

// Modal state
const isAddModalVisible = ref(false)
const isEditModalVisible = ref(false)
const isDeleteModalVisible = ref(false)
const selectedExpense = ref(null)

const filteredExpenses = computed(() => {
  if (!searchQuery.value) {
    return expenseStore.expenses
  }
  
  const query = searchQuery.value.toLowerCase()
  return expenseStore.expenses.filter(expense => {
  console.log(expense, "epdiirukumnutherilapaoppm");
    return (
      expense.note?.toLowerCase().includes(query) ||
      expense.category?.name.toLowerCase().includes(query) ||
      expense.amount?.toString().includes(query)
    )
  })
})


const handleSearch = (query) => {
  searchQuery.value = query;
}


// Open modal handlers
const openAddModal = () => {
  isAddModalVisible.value = true
}

const openEditModal = (expense) => {
  selectedExpense.value = expense
  isEditModalVisible.value = true
}

const openDeleteModal = (expense) => {
  selectedExpense.value = expense
  isDeleteModalVisible.value = true
}

const handleAddModalClose = () => {
  // Additional cleanup if needed
}

const handleEditModalClose = () => {
  selectedExpense.value = null
}

const handleDeleteModalClose = () => {
  selectedExpense.value = null
}

const handleAddSuccess = () => {
  // Additional logic if needed after successful add
}

const handleEditSuccess = () => {
  // Additional logic if needed after successful edit
}

const handleDeleteSuccess = () => {
  // Additional logic if needed after successful delete
}

const handleAddExpense = () => {
  openAddModal()
}

const handleFilter = () => {
  message.info('Filter functionality coming soon')
}

const handleExport = () => {
  message.info('Export functionality coming soon')
}

const handleEdit = (expense) => {
  openEditModal(expense)
}

const handleDelete = (expense) => {
  openDeleteModal(expense)
}

onMounted(() => {
  expenseStore.fetchExpenses()
  // categoryStore.fetchCategories()
})
</script>

<style scoped lang="scss">
.expenses-page {
  width: 100%;
  // padding: 24px 0;
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

.add-expense-btn {
  margin-left: 16px;
}

.search-filter-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}

.search-wrapper {
  flex: 1;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.table-section {
  width: 100%;
}

.filter-btn,
.export-btn {
  white-space: nowrap;
}

.category-pill {
  display: inline-block;
  background-color: var(--color-primary-background-light);
  color: var(--color-primary);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--text-description);
  font-weight: 500;
}

.amount-text {
  color: var(--text-secondary);
  font-size: var(--text-description);
  font-weight: 600;
}

.date-text {
  color: var(--text-secondary);
  font-size: var(--text-description);
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
</style>
