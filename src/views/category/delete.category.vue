<template>
    <Modal v-model="isVisible" title="Delete Category" width="400px" @close="handleClose">
        <div class="delete-confirmation">
            <p class="delete-text">
                Are you sure you want to delete this category?
            </p>
            <div class="delete-actions">
                <Button type="secondary" @click="handleClose">
                    Cancel
                </Button>
                <Button type="primary" @click="handleConfirm" :loading="deleting">
                    Confirm
                </Button>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { createMessageHelpers } from '../../utils/element-plus-utils.js'
import { useCategoryStore } from '../../stores/category-store.js'
import Modal from '../../components/Modal.vue'
import Button from '../../components/Button.vue'
import { categoryApi } from '../../apis/category-api.js'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    category: {
        type: Object,
        default: null
    }
})

const emits = defineEmits(['update:modelValue', 'close', 'success'])

const message = createMessageHelpers()
const categoryStore = useCategoryStore()

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
    if (!props.category?._id) {
        message.error('Category ID is required')
        return
    }

    deleting.value = true
    try {
        console.log(props.category._id, "categoryid to deleteee");
        const response = await categoryApi.deleteCategory(props.category._id);
        console.log(response, "responseofdeletecategory");
        if (response && response?.status === 200) {
            message.success(response?.data?.message || 'Category deleted successfully')
            handleClose()
            await categoryStore.fetchCategories()
            emits('success')
        } else {
            message.error(response?.data?.message || 'Failed to delete category')
        }
    } catch (error) {
        message.error(error?.response?.data?.message || 'Failed to delete category')
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
