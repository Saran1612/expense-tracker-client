<template>
    <Modal v-model="isVisible" title="Add Category" width="500px" @close="handleClose">
        <el-form ref="formRef" :model="categoryForm" :rules="formRules" label-position="top" class="expense-form">
            <el-form-item label="Name" prop="name">
                <Input v-model="categoryForm.name" type="text" placeholder="Enter name" class="form-input" />
            </el-form-item>

            <!-- <el-form-item label="Note" prop="note">
                <Input v-model="expenseForm.note" type="text" placeholder="Enter note" class="form-input" />
            </el-form-item>

            <el-form-item label="Category" prop="category">
                <el-select v-model="expenseForm.category" filterable placeholder="Select category" class="form-select"
                    :loading="categoryStore.loading">
                    <el-option v-for="cat in categoryStore.categories" :key="cat._id || cat.id" :label="cat.name"
                        :value="cat._id || cat.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="Date" prop="date">
                <el-date-picker v-model="expenseForm.date" type="date" placeholder="Select date" format="DD/MM/YYYY"
                    value-format="YYYY-MM-DD" class="form-date-picker" style="width: 100%" />
            </el-form-item>

            <el-form-item label="Tags">
                <el-select v-model="expenseForm.tags" multiple filterable allow-create default-first-option
                    placeholder="Type and press enter to add tags" class="form-select">
                </el-select>
            </el-form-item> -->

            <div class="form-actions">
                <Button type="secondary" @click="handleClose">
                    Cancel
                </Button>
                <Button type="primary" @click="handleSubmit" :loading="submitting">
                    Add
                </Button>
            </div>
        </el-form>
    </Modal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElForm, ElFormItem, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { categoryApi } from '../../apis/category-api.js'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useCategoryStore } from '../../stores/category-store.js'
import Modal from '../../components/Modal.vue'
import Input from '../../components/Input.vue'
import Button from '../../components/Button.vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue', 'close', 'success'])

const message = createMessageHelpers()
const categoryStore = useCategoryStore()

const formRef = ref(null)
const submitting = ref(false)

const categoryForm = ref({
    name: '',
})

const formRules = {
    name: [
        { required: true, message: 'Name is required', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (!value) {
                    callback(new Error('Name is required'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
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

// Reset form and fetch categories when modal opens
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

const resetForm = () => {
    categoryForm.value = {
        name: '',
    }
}

const handleClose = () => {
    isVisible.value = false
}

const handleSubmit = async () => {
    if (!formRef.value) return

    // Validate form
    try {
        await formRef.value.validate()
        submitCategory()
    } catch (error) {
        // Validation failed, error is automatically handled by Element Plus
        console.log('Form validation failed:', error)
    }
}

const submitCategory = async () => {
    submitting.value = true
    try {
        const categoryData = {
            name: categoryForm.value.name,
        }
        const response = await categoryApi.createCategory(categoryData)
        if (response && response?.status === 200) {
            console.log('response categoryData', response)
            message.success(response?.data?.message || 'Category added successfully')
            handleClose()
            await categoryStore.fetchCategories()
            emits('success')
        } else {
            message.error(response?.data?.message || 'Failed to add category')
        }
    } catch (error) {
        message.error(error?.response?.data?.message || 'Failed to add category')
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
    border-radius: 6px;
    border: 1px solid var(--color-primary);
    min-height: 48px;
    padding: 20px 10px;
}

.form-date-picker :deep(.el-input__wrapper:hover) {
    border-color: var(--color-primary);
}

.form-date-picker :deep(.el-input.is-focus .el-input__wrapper) {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(181, 130, 140, 0.1);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;
}
</style>
