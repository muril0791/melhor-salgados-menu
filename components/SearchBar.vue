<template>
    <div class="relative flex items-center w-full lg:w-auto">
        <button @click="toggleSearch" class="p-2 lg:hidden">
            <v-icon>mdi-magnify</v-icon>
        </button>
        <input v-show="isSearchOpen || isDesktop" type="text" placeholder="Search..."
            class="transition-all duration-300 ease-in-out w-full lg:w-auto p-2 border border-gray-300 rounded"
            v-model="query" @input="emitSearch" />
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useWindowSize } from '@vueuse/core';

const query = ref('');
const isSearchOpen = ref(false);

const { width } = useWindowSize();
const isDesktop = computed(() => width.value >= 1024);

const emit = defineEmits(['search']);

function emitSearch() {
    emit('search', query.value);
}

function toggleSearch() {
    isSearchOpen.value = !isSearchOpen.value;
}
</script>

<style scoped>
/* Estilos para SearchBar */
</style>
