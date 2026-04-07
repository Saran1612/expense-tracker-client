<template>
    <div class="chat-wrapper"
        :class="messages.length ? 'justify-end h-[calc(100vh - 200px)]' : 'no-data justify-center'">
        <div v-if="messages.length" class="chat-container">
            <div v-for="message of messages" class="" :class="message.role === 'system'
                ? 'mr-auto w-[fit-content]'
                : 'ml-auto w-[fit-content]'
                ">
                <SystemBubble v-if="message.role === 'system'" :content="message" />
                <UserBubble v-else :content="message" />
            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-end h-full">
            <div class="text-center">
                <!-- <div class="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <img src="/logo.png" alt="Logo" class="w-12 h-12" />
                </div> -->
                <h2 class="text-2xl font-bold text-[var(--color-primary)] mb-2">Ask AI</h2>
                <p class="text-gray-600">Let's start a conversation with AI</p>
            </div>
        </div>

        <div class="my-[25px] flex gap-[10px]">
            <div class="input-wrapper w-full" :class="{ 'input-pill w-full': !messages.length }">
                <Input size="small" v-model="input" placeholder="Ask AI..." class="w-full" :clearable="true"
                    @keyup.enter="sendMessage" />
            </div>
            <Button v-if="messages.length" circle type="primary" class="!w-[40px] !h-[40px]" :disabled="!input"
                @click="sendMessage">
                <Send />
            </Button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import SystemBubble from "./system.bubble.vue";
import UserBubble from "./user.bubble.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import { Send } from "@lucide/vue";
import { dummyData } from "../../utils/sample.conversations.js";

const input = ref("");

console.log(dummyData, "dummyData");

const messages = reactive(dummyData);

const sendMessage = () => {
    if (!input.value) return;

    messages.push({
        id: Date.now(),
        role: "user",
        content: input.value,
        timestamp: new Date().toISOString(),
    });

    input.value = "";

    messages.push({
        id: Date.now(),
        role: "system",
        content: "This is a test response",
        timestamp: new Date().toISOString(),
    });
};
</script>

<style scoped>
.chat-wrapper {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    /* justify-content: end; */
    height: calc(100vh - 125px);
}

.chat-container {
    padding: 1.5rem;
    border: 1.5px solid var(--color-chat-secondary);
    border-radius: 10px;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    scrollbar-width: none;
    /* Firefox */
}

.chat-container::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Edge */
}

.input-pill :deep(.el-input__wrapper) {
    border-radius: 50px !important;
}
</style>
