<template>
    <div class="my-[20px] flex gap-[10px] justify-center items-start">
        <div
            class="text-left bg-[var(--color-primary)]  px-[20px] py-[10px] rounded-tl-[10px] rounded-bl-[10px] rounded-br-[10px] text-white">
            <p class="text-[11px]">{{ content.content }}</p>
            <time class="mt-[3px] text-[8px] text-right opacity-70">{{
                new Date(content.timestamp).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric'
                }) }}</time>
        </div>
        <div class="bg-[var(--color-chat-secondary)] w-[35px] h-[35px] rounded-full flex items-center justify-center">
            <User color="var(--color-primary)" size="18" />
        </div>
    </div>
</template>

<script setup>
import { User } from '@lucide/vue';

const props = defineProps({
    content: [Object, Array],
})

</script>

<style scoped></style>