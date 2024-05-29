<template>
  <main class="border-b pb-6">
    <section>
      <NavBar @search="handleSearch" @openCart="openCart" />
    </section>
    <Snackbar ref="snackbarRef" />
    <Cart :isOpen="isCartOpen" @closeCart="closeCart" />
    <div class="max-w-screen-xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
      <div v-for="(items, category) in filteredItems" :key="category">
        <h2 class="text-2xl font-bold mb-4 capitalize">{{ category }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <Card v-for="item in items" :key="item.id" :item="item" @add-to-cart="addToCart" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/store/index';
import NavBar from '@/components/NavBar.vue';
import Snackbar from '@/components/Snackbar.vue';
import Cart from '@/components/Cart.vue';
import Card from '@/components/Card.vue';
import DBitems from './DBitems.json';

const snackbarRef = ref(null);
const cartStore = useCartStore();
const searchQuery = ref('');

const isCartOpen = ref(false);

const items = ref(DBitems);

const filteredItems = computed(() => {
  const result = {};
  for (const category in items.value) {
    result[category] = items.value[category].filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return result;
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

function openCart() {
  isCartOpen.value = true;
}

function closeCart() {
  isCartOpen.value = false;
}

onMounted(() => {
  cartStore.loadCartItems();
});
</script>

<style>
/* Seu estilo aqui */
</style>
