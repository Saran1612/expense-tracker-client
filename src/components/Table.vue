<script setup>

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: 'auto'
  }
})

const emits = defineEmits(['edit', 'delete', 'row-click'])

const handleEdit = (row) => {
  emits('edit', row)
}

const handleRowClick = (row) => {
  emits('row-click', row)
}
</script>

<template>
  <div class="table-wrapper">
    <el-table
      :data="data"
      :loading="loading"
      :height="height"
      class="custom-table"
      @row-click="handleRowClick"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
      > 
        <template v-if="column.slot" #default="{ row }">
          <slot :name="column.prop" :row="row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 8px;
}

.custom-table :deep(.el-table) {
  background-color: transparent;
}

.custom-table :deep(.el-table__header) {
  background-color: #F9FAFB;
}

.custom-table :deep(.el-table__header th) {
  background-color: var(--color-primary-background-light);
  color: var(--text-primary);
  font-size: var(--text-description);
  font-weight: 600;
  border-bottom: 1px solid #E5E7EB;
}

.custom-table :deep(.el-table__body tr) {
  cursor: pointer;
  transition: background-color 0.2s;
}

.custom-table :deep(.el-table__body tr:hover) {
  background-color: #F9FAFB;
}

.custom-table :deep(.el-table__body td) {
  // padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  font-size: var(--text-description);
  color: var(--text-secondary);

}

.actions-cell {
  display: flex;
  gap: 8px;
}
</style>

