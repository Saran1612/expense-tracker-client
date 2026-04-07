<template>
    <div class="my-[10px] flex gap-[10px] justify-center align-center">
        <div class="bg-[var(--color-primary)] w-[35px] h-[35px] rounded-full flex items-center justify-center">
            <Bot color="var(--color-chat-secondary)" size="18" />
        </div>
        <div
            class="bg-[var(--color-chat-secondary)] text-left text-[var(--color-primary)] px-[20px] py-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]">
            <p class="text-[11px]">{{ content.content }}</p>
            <time class="mt-[3px] text-[8px] text-right opacity-70">{{
                new Date(content.timestamp).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric'
                }) }}</time>
        </div>
    </div>
</template>

<script setup>
import { Bot } from '@lucide/vue';

const props = defineProps({
    content: [Object, Array],
})

</script>

<style scoped></style>