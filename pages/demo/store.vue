<template>
  <div>
    <h1>store demo page</h1>
    <p>state: {{ count }}</p>
    <p>getter: {{ doubleCount }}</p>
    <p>action: {{ increment }}</p>
    <p>store data:</p>
    <p>{{ demoUsers.result.content }}</p>
    <p>store data with QsRequest:</p>
    <p>{{ demoUsersByQsRequest.result.content }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: true });

const store = useGsDemoStore();
const count = store.count;
const doubleCount = store.doubleCount;
const increment = store.increment();

const demoUsers = await store.getDemoUsers();

const demoUsersByQsRequest = await store.getDemoUsersByDemoRequest();
</script>
