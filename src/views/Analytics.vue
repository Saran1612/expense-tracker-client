<template>
  <div class="analytics-page">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="page-title">Analytics & Reports</h1>
      <p class="page-subtitle">Deep insights into your spending patterns</p>
    </div>

    <!-- Key Metrics Section -->
    <div class="metrics-grid">
      <Card label="Average Daily Spend" value="$41.13" :icon="DollarSign" change="5%" change-type="negative" />
      <Card label="This Month" value="$1,234" :icon="Calendar" />
      <Card label="Top Category" value="Housing" :icon="TrendingUp" change="+12%" change-type="positive" />
      <Card label="Savings Rate" value="32%" :icon="TrendingUp" change="+3%" change-type="positive" />
    </div>

    <!-- Charts Section -->
    <div class="charts-grid">
      <!-- Monthly Spending Trend -->
      <div class="chart-card">
        <h3 class="chart-title">Monthly Spending Trend</h3>
        <LineChart :data="monthlySpendingData" :x-axis="monthlyLabels" />
      </div>

      <!-- Spending by Category -->
      <div class="chart-card">
        <h3 class="chart-title">Spending by Category</h3>
        <PieChart :data="categorySpendingData" />
      </div>
    </div>

    <!-- Weekly Comparison and AI Insights -->
    <div class="bottom-section">
      <!-- Weekly Comparison -->
      <div class="chart-card">
        <h3 class="chart-title">Weekly Comparison</h3>
        <BarChart :data="weeklyData" :x-axis="weeklyLabels" />
      </div>

      <!-- AI Insights -->
      <div class="insights-card">
        <h3 class="chart-title">AI Insights</h3>
        <div class="insights-list">
          <InsightCard type="info" :icon="MapPin"
            message="You spend 35% more on weekends compared to weekdays. Consider meal planning to reduce food expenses." />
          <InsightCard type="success" :icon="CheckCircle"
            message="You're on track to save $400 this month. Keep up the good work!" />
          <InsightCard type="warning" :icon="AlertTriangle"
            message="Your entertainment spending is 20% higher than last month." />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  DollarSign,
  Calendar,
  TrendingUp,
  MapPin,
  CheckCircle,
  AlertTriangle
} from '@lucide/vue'
import Card from '../components/Card.vue'
import LineChart from '../components/LineChart.vue'
import PieChart from '../components/PieChart.vue'
import BarChart from '../components/BarChart.vue'
import InsightCard from '../components/InsightCard.vue'

// Monthly spending data
const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthlySpendingData = ref([1200, 1320, 1010, 1340, 1290, 1330, 1320, 1400, 1350, 1234, 1450, 1500])

// Category spending data for pie chart
const categorySpendingData = ref([
  { value: 1048, name: 'Housing' },
  { value: 735, name: 'Food' },
  { value: 580, name: 'Transportation' },
  { value: 484, name: 'Entertainment' },
  { value: 300, name: 'Health' }
])

// Weekly comparison data
const weeklyLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
const weeklyData = ref([450, 380, 420, 390])
</script>

<style scoped lang="scss">
.analytics-page {
  width: 100%;
}

.header-section {
  margin-bottom: 32px;
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
}

.chart-title {
  font-size: var(--text-header);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  line-height: 1.2;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.insights-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--color-primary);
}

.insights-list {
  display: flex;
  flex-direction: column;
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .bottom-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
