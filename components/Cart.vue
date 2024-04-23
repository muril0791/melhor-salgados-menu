<!-- Cart.vue -->
<template>
  <div>
    <button @click="toggleCart" class="p-2 rounded hover:bg-gray-600 rounded fixed top-4 right-4 z-50">
      <v-icon>mdi-cart</v-icon>
      <span class="bg-red-600 px-2 py-1 rounded-full text-xs ml-2">{{ cartItems.length }}</span>
    </button>
    <div class="fixed top-0 right-0 z-40" :class="{ 'w-full h-full': isMobile, 'w-1/2': !isMobile, 'hidden': !isOpen }">
      <div class="bg-white h-full shadow-xl overflow-auto p-4">
        <h2 class="text-lg font-bold mb-4">Carrinho de Compras</h2>
        <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center mb-2">
          <div>
            <p>{{ item.name }}</p>
            <p class="text-sm text-gray-600">${{ item.price }} x {{ item.quantity }}</p>
          </div>
          <button @click.stop="removeItem(item.id)" class="text-red-500 text-sm">Remover</button>
        </div>
        <div class="mt-4">
          <p class="font-bold">Total: ${{ total }}</p>
          <button @click="goToStep2" class="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Próximo
            Passo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useWindowSize } from '@vueuse/core';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
});

const isOpen = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const total = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const toggleCart = () => {
  isOpen.value = !isOpen.value;
};

const removeItem = (id) => {
  const index = props.cartItems.findIndex(item => item.id === id);
  if (index !== -1) {
    props.cartItems.splice(index, 1);
  }
};

const goToStep2 = () => {
  console.log('Navega para o passo 2');
  // Implementar navegação para o passo 2 (detalhes de entrega e pagamento)
};
</script>
