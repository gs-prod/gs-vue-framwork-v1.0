<template>
  <div>
    <h1>store demo page</h1>
    <p>state: {{ count }}</p>
    <p>getter: {{ doubleCount }}</p>
    <p>action: {{ increment }}</p>
  </div>
</template>

<script setup lang="ts">
const store = useGsDemoStore();
const count = store.count;
const doubleCount = store.doubleCount;
const increment = store.increment();
</script>
