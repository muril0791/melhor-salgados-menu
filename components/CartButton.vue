<template>
    <button @click="toggleCart"
        class="p-2 rounded hover:bg-gray-600 fixed lg:static top-4 right-4 lg:top-auto lg:right-auto z-50 flex items-center">
        <v-icon>mdi-basket-outline</v-icon>
        <span class="bg-green-600 px-2 py-1 rounded-full text-xs text-white ml-2">
            {{ cartItems.length }}
        </span>
    </button>
</template>

<script setup>
const props = defineProps({
    cartItems: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['toggleCart']);

function toggleCart() {
    emit('toggleCart');
}
</script>

<style scoped>
/* Estilos para CartButton */
</style>
