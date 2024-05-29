<template>
  <div>
    <!-- Overlay para fechar o carrinho ao clicar fora -->
    <div v-if="isOpen" @click="closeCart" class="fixed inset-0 bg-black opacity-50 z-40"></div>

    <!-- Carrinho de Compras -->
    <div
      class="fixed top-0 right-0 z-50 bg-white shadow-xl overflow-auto p-4 transform transition-transform duration-300"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen, 'w-full h-full': isMobile, 'w-1/2': !isMobile }">
      <button @click="closeCart" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <v-icon>mdi-close</v-icon>
      </button>
      <h2 class="text-lg font-bold mb-4">Carrinho de Compras</h2>
      <div v-for="item in cartStore.cartItems" :key="item.id" class="flex justify-between items-center mb-2">
        <div>
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-sm text-gray-600">${{ item.price }} x {{ item.quantity }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button @click.stop="decreaseQuantity(item.id)" class="text-gray-500">-</button>
          <span>{{ item.quantity }}</span>
          <button @click.stop="increaseQuantity(item.id)" class="text-gray-500">+</button>
          <button @click.stop="removeItem(item.id)" class="text-red-500 text-sm">Remover</button>
        </div>
      </div>
      <div class="mt-4">
        <p class="font-bold text-lg">Total: ${{ total }}</p>
        <button @click="goToStep2" class="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Próximo Passo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/store/index';
import { useWindowSize } from '@vueuse/core';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['closeCart']);

const cartStore = useCartStore();
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const total = computed(() => {
  return cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

function closeCart() {
  emit('closeCart');
}

function removeItem(id) {
  cartStore.removeItem(id);
}

function goToStep2() {
  console.log('Navega para o passo 2');
  // Implementar navegação para o passo 2 (detalhes de entrega e pagamento)
}

function increaseQuantity(id) {
  const item = cartStore.cartItems.find(item => item.id === id);
  if (item) {
    item.quantity++;
    cartStore.saveCartItems();
  }
}

function decreaseQuantity(id) {
  const item = cartStore.cartItems.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
    cartStore.saveCartItems();
  }
}
</script>

<style scoped>
.translate-x-full {
  transform: translateX(100%);
}

.translate-x-0 {
  transform: translateX(0);
}
</style>
