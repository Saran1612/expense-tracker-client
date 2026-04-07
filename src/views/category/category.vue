<template>
  <div class="category-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="page-title">Categories</h1>
        <p class="page-subtitle">Organize your expenses by category</p>
      </div>
      <Button type="primary" :icon="Plus" @click="handleAddCategory" class="add-category-btn">
        Add Category
      </Button>
    </div>

    <div class="search-filter-section">
      <div class="search-wrapper">
        <Search v-model="searchQuery" placeholder="Search categories..." @search="handleSearch" />
      </div>
    </div>

    <!-- Category Table -->
    <div class="table-section">
      <Table :data="filteredCategories.filter((cat) => cat.status)" :columns="categoryColumns" :loading="loading"
        height="calc(100vh - 140px)" @edit="handleEdit" @delete="handleDelete" @row-click="handleRowClick">
        <template #category="{ row }">
          <div class="category-cell">
            <span>{{ row.icon }}</span>
            <span class="category-name">{{
              row.name || row.categoryName
            }}</span>
          </div>
        </template>

        <template #totalSpent="{ row }">
          <span class="amount-text">
            {{ formatAmount(row.totalSpent) }}
          </span>
        </template>

        <template #percentage="{ row }">
          <span class="percentage-text"> {{ row.percentage }}% </span>
        </template>

        <template #transactions="{ row }">
          <span class="transactions-text">
            {{ row.transactionCount || row.transactions || 0 }}
          </span>
        </template>

        <template #actions="{ row }">
          <div class="actions-cell">
            <Pencil :size="18" class="action-icon" @click.stop="handleEdit(row)" />
            <Trash2 :size="18" class="action-icon" @click.stop="handleDelete(row)" />
          </div>
        </template>
      </Table>
    </div>

    <!-- Add Expense Modal -->
    <AddCategory v-model="isAddModalVisible" @close="handleAddModalClose" @success="handleAddSuccess" />

    <!-- Edit Expense Modal -->
    <EditCategory v-model="isEditModalVisible" :category="selectedCategory" @close="handleEditModalClose"
      @success="handleEditSuccess" />

    <!-- Delete Expense Modal -->
    <DeleteCategory v-model="isDeleteModalVisible" :category="selectedCategory" @close="handleDeleteModalClose"
      @success="handleDeleteSuccess" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Plus,
  ShoppingCart,
  Car,
  Video,
  Heart,
  Home,
  Briefcase,
  LayoutGrid,
  Pencil,
  Trash2,
} from "@lucide/vue";
import { categoryApi } from "../../apis/category-api.js";
import { createMessageHelpers } from "../../utils/element-plus-utils.js";
import Button from "../../components/Button.vue";
import Table from "../../components/Table.vue";
import { useCategoryStore } from "../../stores/category-store.js";
import Search from "../../components/Search.vue";
import AddCategory from "./add.category.vue";
import EditCategory from "./edit.category.vue";
import DeleteCategory from "./delete.category.vue";

const message = createMessageHelpers();
const categoryStore = useCategoryStore();
console.log(categoryStore.categories, "categoryStorecategories");

const categories = computed(() => categoryStore.categories);
const isAddModalVisible = ref(false);
const isEditModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedCategory = ref(null)

const filteredCategories = computed(() => {
  if (!searchQuery.value || !searchQuery.value.trim()) {
    return categories.value;
  }

  const query = searchQuery.value.toLowerCase().trim();

  return categories.value.filter((category) => {
    console.log(category, "categorycategorycategory");
    // Search by category name (case-insensitive)
    const nameMatch = category?.name?.toLowerCase().includes(query) || false;

    // Search by total spent amount
    const totalSpent = category?.totalSpent ?? 0;
    const amountMatch = String(totalSpent).includes(query);

    // Search by transaction count
    const transactionCount = category?.transactionCount ?? 0;
    const transactionMatch = String(transactionCount).includes(query);

    return nameMatch || amountMatch || transactionMatch;
  });
});

const loading = computed(() => categoryStore.loading);
const searchQuery = ref("");

// Table columns configuration
const categoryColumns = [
  {
    prop: "category",
    label: "Category",
    minWidth: "200",
    slot: true,
  },
  {
    prop: "totalSpent",
    label: "Total Spent",
    minWidth: "150",
    slot: true,
  },
  {
    prop: "percentage",
    label: "% of Total",
    minWidth: "120",
    slot: true,
  },
  {
    prop: "transactions",
    label: "Transactions Count",
    minWidth: "130",
    slot: true,
  },
  {
    prop: "actions",
    label: "Action",
    width: "100",
    slot: true,
  },
];

// // Calculate total spent across all categories
// const totalSpent = computed(() => {
//   return categories.value.reduce((sum, cat) => {
//     return sum + (cat.totalSpent || cat.amount || 0)
//   }, 0)
// })

// // Prepare table data with percentage calculation
// const tableData = computed(() => {
//   return categories.value.map(category => {
//     const spent = category.totalSpent || category.amount || 0
//     const percentage = totalSpent.value > 0
//       ? ((spent / totalSpent.value) * 100).toFixed(1)
//       : '0.0'

//     return {
//       ...category,
//       percentage
//     }
//   })
// })

const formatAmount = (amount) => {
  if (typeof amount === "number") {
    return `${amount.toFixed(2)} ₹`;
  }
  return amount || "0.00";
};

// const fetchCategories = async () => {
//   loading.value = true
//   try {
//     const response = await categoryApi.getCategories();
//     console.log(response, "responseofcategories");
//     if (response.data && response.status === 200) {
//       categories.value = response?.data?.categories || []
//     }
//   } catch (error) {
//     message.error('Failed to load categories');
//   } finally {
//     loading.value = false
//   }
// }

const handleAddModalClose = () => {
  // Additional cleanup if needed
}

const handleSearch = (query) => {
  searchQuery.value = query;
};

const openAddModal = () => {
  isAddModalVisible.value = true;
};

const handleAddCategory = () => {
  openAddModal();
};

const openEditModal = (category) => {
  selectedCategory.value = category
  isEditModalVisible.value = true
}

const openDeleteModal = (category) => {
  selectedCategory.value = category
  isDeleteModalVisible.value = true
}

const handleEdit = (category) => {
  openEditModal(category)
};

const handleDelete = (category) => {
  openDeleteModal(category)
};

const handleRowClick = (category) => {
  // Navigate to category details or filter expenses by category
  message.info(`Viewing category: ${category.name || category.categoryName}`);
};

const handleEditModalClose = () => {
  selectedCategory.value = null
}

const handleDeleteModalClose = () => {
  selectedCategory.value = null
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

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<style scoped lang="scss">
.category-page {
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
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.add-category-btn {
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

.percentage-text {
  color: var(--text-secondary);
  font-size: var(--text-content);
  font-weight: 500;
}

.transactions-text {
  color: var(--text-secondary);
  font-size: var(--text-content);
}

.actions-cell {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-icon {
  color: var(--color-primary);
  cursor: pointer;
  transition: color 0.2s;
}

.action-icon:hover {
  color: var(--color-primary-hover);
}

.action-icon:first-child {
  color: var(--color-primary);
}

.action-icon:last-child:hover {
  color: #dc2626;
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
</style>
