<template>
  <div class="home-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Welcome back! Here's your spending overview.</p>
      </div>
      <!-- <Button
        type="primary"
        :icon="Plus"
        @click="handleAddExpense"
        class="add-expense-btn"
      >
        Add Expense
      </Button> -->
    </div>

    <!-- Key Metrics Section -->
    <div class="metrics-grid">
      <Card
        label="Total Spent"
        :value="totalSpent"
        :icon="TrendingUp"
        change=""
        change-type="negative"
      />
      <Card
        label="Monthly Budget"
        :value="monthBudget"
        :icon="Wallet"
      />
      <Card
        label="Remaining"
        :value="remaining"
        :icon="TrendingUp"
        change=""
        change-type="positive"
      />
      <Card
        label="Categories"
        :value="totalCategories"
        :icon="LayoutGrid"
      />
    </div>

    <!-- Visualization Section -->
    <div class="charts-grid">
      <!-- Spending Trend -->
      <div class="chart-card">
        <h3 class="chart-title">Daily Spending Trend (Current Month)</h3>
        <LineChart
          :data="dailySpendingTrend?.data || []"
          :x-axis="dailySpendingTrend?.xAxis || []"
          :height="350"
          :show-area="false"
          series-name="Daily Spending"
        />
      </div>

      <!-- Category Breakdown -->
      <div class="chart-card">
        <h3 class="chart-title">Category Breakdown (Current Month)</h3>
        <PieChart
          :data="categoryData"
          :height="350"
        />
      </div>
    </div>

    <!-- Recent Expenses Section -->
    <div class="recent-expenses-card">
      <h3 class="chart-title">Recent Expenses</h3>
      <Table
        :data="recentTransactions"
        :columns="recentExpensesColumns"
        :loading="loading"
        @row-click="handleTransactionClick"
      >
        <template #category="{ row }">
          <span class="category-pill">
            {{ row.category?.name || 'N/A' }}
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
      </Table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  Plus,
  TrendingUp,
  Wallet,
  LayoutGrid
} from '@lucide/vue'
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
import Button from '../components/Button.vue'
import Card from '../components/Card.vue'
import Table from '../components/Table.vue'
import LineChart from '../components/LineChart.vue'
import PieChart from '../components/PieChart.vue'
import { expenseApi } from '../apis/expense-api.js'
import { dashboardApi } from '../apis/dashboard-api.js'

const router = useRouter()

const expenses = ref([])
const loading = ref(false)

const recentTransactions = ref([])
const totalSpent = ref(0)
const monthBudget = ref(0)
const remaining = ref(0)
const totalCategories = ref(0)
const dailySpendingTrend = ref({
  xAxis: [],
  data: []
})
const categoryData = ref([])

// Table columns configuration for recent expenses
const recentExpensesColumns = [
  {
    prop: 'note',
    label: 'Description',
    minWidth: '200',
    slot: false
  },
  {
    prop: 'category',
    label: 'Category',
    minWidth: '150',
    slot: true
  },
  {
    prop: 'date',
    label: 'Date',
    minWidth: '120',
    slot: true
  },
  {
    prop: 'amount',
    label: 'Amount',
    minWidth: '120',
    slot: true
  }
]

const formatAmount = (amount) => {
  if (typeof amount === 'number') {
    return `${amount.toFixed(2)} ₹`
  }
  return amount || '0.00 ₹'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return moment(dateString).format('DD-MM-YYYY')
}

const fetchExpenses = async () => {
  loading.value = true
  try {
    const response = await dashboardApi.getDashboardData();
    console.log(response, "responseofdashboard");
    if (response && response.status === 200) {
      const data = response.data.data || {}
      totalSpent.value = data.totalSpent || 0
      monthBudget.value = data.monthBudget || 0
      remaining.value = data.remaining || 0
      totalCategories.value = data.totalCategories || 0
      recentTransactions.value = data.recentTransactions || []
      dailySpendingTrend.value = data.dailySpendingTrend || { xAxis: [], data: [] }
      categoryData.value = data.categoryWiseSpending || []
    }
  } catch (error) {
    console.error('Error fetching expenses:', error)
  } finally {
    loading.value = false
  }
}

const handleAddExpense = () => {
  router.push({ name: 'Expenses' })
}

const handleTransactionClick = (row) => {
  // Navigate to expense detail or edit
  console.log('Transaction clicked:', row)
}

onMounted(() => {
  fetchExpenses()
})
</script>

<style scoped lang="scss">
.home-page {
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
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
}

.add-expense-btn {
  margin-left: 16px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--color-primary);
  min-height: 300px;
}

.chart-title {
  font-size: var(--text-header);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  line-height: 1.2;
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  color: #6B7280;
  font-size: var(--text-content);
  background-color: #F9FAFB;
  border-radius: 4px;
  border: 1px dashed #D1D5DB;
}

.recent-expenses-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--color-primary);
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

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .header-section {
    flex-direction: column;
    gap: 16px;
  }

  .add-expense-btn {
    margin-left: 0;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
