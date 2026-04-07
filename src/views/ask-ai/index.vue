<template>
    <div v-if="!modeVisible"
        class="cursor-pointer rounded-lg w-[40px] h-[40px] bg-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary-hover)]"
        @click="toggleChat">
        <Bot color="#fff" size="20" />
    </div>
    <div v-if="modeVisible" class="fixed bottom-0 right-0 top-0 left-0">
        <Modal v-model="modeVisible" title="How can i help you today!" width="500px" show-close="true"
            close-on-click-modal="false" close-on-press-escape="false">
            <template #default>
                <div>
                    LLM Chat
                </div>
            </template>
        </Modal>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { Bot } from '@lucide/vue';

const modeVisible = ref(false);

const toggleChat = () => {
    modeVisible.value = !modeVisible.value;
}

</script>


<style scoped></style>