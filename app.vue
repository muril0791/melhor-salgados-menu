<template>
  <main class="border-b pb-6">
    <section>
      <NavBar :cartItems="cartStore.cartItems" />
    </section>
    <section class="flex justify-center">
      <SearchBar @search="handleSearch" />
    </section>
  </main>
  <div>
    <Snackbar ref="snackbarRef" />
  </div>
  <div class="max-w-screen-xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card v-for="item in filteredItems" :key="item.id" :item="item" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/store/index';
import NavBar from '@/components/NavBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import Card from '@/components/Card.vue';
import Snackbar from '@/components/Snackbar.vue';
import DBitems from './DBitems.json';

const snackbarRef = ref(null);
const cartStore = useCartStore();
const searchQuery = ref('');

const items = ref(DBitems);

const filteredItems = computed(() => {
  return items.value[cartStore.category].filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function showSnackbar() {
  snackbarRef.value.showSnackbar('Mensagem de exemplo');
}

function addToCart({ item, quantity }) {
  cartStore.addToCart(item, quantity);
  snackbarRef.value.showSnackbar(`Item adicionado ao carrinho! ${quantity} ${item.name}`);
}

function handleSearch(query) {
  searchQuery.value = query;
}

onMounted(() => {
  cartStore.loadCartItems();
});
</script>

<style>
/* Your styles here */
</style>
