<template>
  <div>
    <!-- Botão para abrir/fechar o carrinho -->
    <button @click="toggleCart" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 fixed top-4 right-4 z-50">
      <span>Cart</span>
      <span class="bg-red-600 px-2 py-1 rounded-full text-xs ml-2">{{ cartItems.length }}</span>
    </button>

    <!-- Carrinho Drawer -->
    <div class="fixed top-0 right-0 z-40" :class="{ 'w-full h-full': isMobile, 'w-1/2': !isMobile, 'hidden': !isOpen }">
      <div class="bg-white h-full shadow-xl overflow-auto p-4">
        <h2 class="text-lg font-bold mb-4">Carrinho de Compras</h2>
        <div v-for="item in cartItems" :key="item.id" @click="openModal(item)"
          class="flex justify-between items-center mb-2 cursor-pointer">
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
    default: () => [] // Definindo um valor padrão para evitar erros
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
  console.log('Ir para o passo 2');
};
</script>
