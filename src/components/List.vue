<script setup>
const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['item-click'])

const handleItemClick = (transaction) => {
  emits('item-click', transaction)
}

const formatAmount = (amount) => {
  if (typeof amount === 'number') {
    return `$${amount.toFixed(2)}`
  }
  return amount || '$0.00'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  
  // Reset time for comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())
  const twoDaysAgoOnly = new Date(twoDaysAgo.getFullYear(), twoDaysAgo.getMonth(), twoDaysAgo.getDate())
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Today'
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return 'Yesterday'
  } else if (dateOnly.getTime() === twoDaysAgoOnly.getTime()) {
    return '2 days ago'
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}
</script>

<template>
  <div class="transaction-list">
    <div
      v-for="(transaction, index) in transactions"
      :key="transaction.id || transaction._id || index"
      class="transaction-item"
      @click="handleItemClick(transaction)"
    >
      <div class="transaction-content">
        <div class="transaction-title">{{ transaction.description || transaction.title || transaction.name }}</div>
        <div class="transaction-meta">
          <span class="transaction-category">{{ transaction.category }}</span>
          <span class="transaction-separator">•</span>
          <span class="transaction-date">{{ formatDate(transaction.date || transaction.createdAt) }}</span>
        </div>
      </div>
      <div class="transaction-amount">{{ formatAmount(transaction.amount) }}</div>
    </div>
    <div v-if="transactions.length === 0 && !loading" class="empty-state">
      No recent transactions
    </div>
    <div v-if="loading" class="loading-state">
      Loading...
    </div>
  </div>
</template>

<style scoped lang="scss">
.transaction-list {
  width: 100%;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #E5E7EB;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-item:hover {
  background-color: #F9FAFB;
  margin: 0 -24px;
  padding: 16px 24px;
  border-radius: 4px;
}

.transaction-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.transaction-title {
  font-size: var(--text-content);
  font-weight: 600;
  color: #374151;
  line-height: 1.4;
}

.transaction-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-content);
  color: #6B7280;
}

.transaction-category {
  color: var(--color-primary);
  font-weight: 500;
}

.transaction-separator {
  color: #9CA3AF;
}

.transaction-date {
  color: #6B7280;
}

.transaction-amount {
  font-size: var(--text-content);
  font-weight: 600;
  color: #374151;
  margin-left: 16px;
}

.empty-state,
.loading-state {
  text-align: center;
  padding: 32px;
  color: #6B7280;
  font-size: var(--text-content);
}
</style>

