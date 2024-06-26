<template>
  <div class="fixed top-0 right-0 z-50 bg-white shadow-xl overflow-auto p-6 transform transition-transform duration-300" :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen, 'w-full h-full': isMobile, 'w-1/3': !isMobile }">
    <div v-if="!isCheckoutFlowOpen">
      <div class="flex justify-between items-center mb-4">
        <button @click="closeCart" class="text-gray-500 hover:text-gray-700">
          <v-icon>mdi-chevron-left</v-icon>
        </button>
        <h2 class="text-2xl font-bold">Meu Carrinho</h2>
        <button class="text-gray-500 hover:text-gray-700" @click="clearCart">
          <v-icon>mdi-delete-outline</v-icon>
        </button>
      </div>
      <div v-for="item in cartStore?.cartItems || []" :key="item.id" class="relative flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg shadow" @mousedown="startSwipe(item)">
        <div class="flex items-center">
          <img :src="item.imageUrl" alt="" class="w-16 h-16 rounded-full mr-4" />
          <div>
            <p class="text-lg">{{ item.quantity }} x {{ item.name }} <span v-if="item.detail">- {{ item.detail }}</span></p>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
          </div>
        </div>
        <p class="text-lg font-semibold">R$ {{ item.totalPrice }}</p>
        <div class="hidden md:flex absolute right-4 top-4 space-x-2">
          <button @click="removeItem(item)" class="text-red-500 hover:text-red-700">
            <v-icon>mdi-delete</v-icon>
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center mt-6">
        <p class="text-lg font-bold">Total:</p>
        <p class="text-xl font-bold">R$ {{ total.toFixed(2) }}</p>
      </div>
      <button class="w-full bg-green-600 text-white py-3 rounded mt-6 hover:bg-green-700 transition" @click="proceedToCheckout" :disabled="total < 15">
        Finalizar Pedido
      </button>
    </div>
    <div v-else>
      <div class="flex justify-between items-center mb-4">
        <button @click="goBack" class="text-gray-500 hover:text-gray-700">
          <v-icon>mdi-chevron-left</v-icon>
        </button>
        <h2 class="text-2xl font-bold">Checkout</h2>
      </div>
      <CheckoutFlow @closeCheckoutFlow="closeCheckoutFlow" @finalizeOrder="finalizeOrder" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/store/index';
import { useWindowSize } from '@vueuse/core';
import Snackbar from '@/components/Snackbar.vue';
import CheckoutFlow from '@/components/CheckoutFlow.vue';

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
  return cartStore?.cartItems?.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0) || 0;
});

const snackbarRef = ref(null);
const currentSwipeItem = ref(null);
const isCheckoutFlowOpen = ref(false);

function closeCart() {
  emit('closeCart');
}

function goBack() {
  isCheckoutFlowOpen.value = false;
}

function removeItem(item) {
  cartStore.removeItem(item.id, item.detail);
}

function proceedToCheckout() {
  isCheckoutFlowOpen.value = true;
}

function clearCart() {
  cartStore.clearCart();
}

function startSwipe(item) {
  currentSwipeItem.value = item;
}

onMounted(() => {
  cartStore.loadCartItems();
});
</script>

<style scoped>
.translate-x-full {
  transform: translateX(100%);
}

.translate-x-0 {
  transform: translateX(0);
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
