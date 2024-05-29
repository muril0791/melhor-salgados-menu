<template>
  <nav class="bg-base-300 p-4 flex justify-between items-center">
    <div class="flex items-center lg:w-1/2 lg:justify-center">
      <SearchBar @search="handleSearch" />
    </div>
    <CartButton :cartItems="cartStore.cartItems" @toggleCart="toggleCart" />
  </nav>
  <Cart :isOpen="isCartOpen" @closeCart="toggleCart" />
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/store/index';
import SearchBar from '@/components/SearchBar.vue';
import CartButton from '@/components/CartButton.vue';
import Cart from '@/components/Cart.vue';

const cartStore = useCartStore();
const isCartOpen = ref(false);

const emit = defineEmits(['search']);

function handleSearch(query) {
  emit('search', query);
}

function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}
</script>

<style scoped>
/* Estilos para NavBar */
</style>
