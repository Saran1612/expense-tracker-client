<template>
    <div>
        <div class="header-section">
            <h1 class="page-title">AI Assistant</h1>
            <p class="page-subtitle">Chat with your personal finance assistant</p>
        </div>

        <div>
            <Container />
        </div>
    </div>
</template>

<script setup>
import Container from './container.vue'

</script>

<style scoped>
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
</style>