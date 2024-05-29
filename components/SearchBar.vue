<template>
    <div class="relative w-full max-w-xs">
        <input type="text" placeholder="Search..." class="w-full p-2 border border-gray-300 rounded" v-model="query"
            @input="emitSearch" />
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const query = ref('');

const emit = defineEmits(['search']);

function emitSearch() {
    emit('search', query.value);
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
