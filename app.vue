<template>
  <div>
    <NavBar />
    <div class="max-w-screen-xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
      <div v-for="(items, category) in filteredItems" :key="category">
        <h2 class="text-2xl font-bold mb-4 capitalize">{{ category }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <Card v-for="item in items" :key="item.id" :item="item" @open-modal="openModal" />
        </div>
      </div>
    </div>
    <Modal v-if="isModalOpen" :item="selectedItem" @close-modal="closeModal" @add-to-cart="addToCart" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import Card from '@/components/Card.vue';
import Modal from '@/components/Modal.vue';
import { useCartStore } from '@/store/index'; // Supondo que você tenha um Pinia store para o carrinho
import DBitems from '../DBitems.json';

const items = ref(DBitems);
const isModalOpen = ref(false);
const selectedItem = ref(null);
const cartStore = useCartStore();

const filteredItems = computed(() => {
  const result = {};
  for (const category in items.value) {
    result[category] = items.value[category];
  }
  return result;
});

function openModal(item) {
  selectedItem.value = item;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedItem.value = null;
}

function addToCart(payload) {
  cartStore.addToCart(payload.item, payload.quantity, payload.totalPrice, payload.detail);
  console.log('Item added to cart:', payload);
}
</script>
