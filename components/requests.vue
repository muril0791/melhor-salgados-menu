<!-- Cart.vue -->
<template>
  <div>
    <button
      @click="toggleCart"
      class="p-2 rounded hover:bg-gray-600 rounded fixed top-4 left-4 z-50"
    >
      <v-icon>mdi-basket-outline</v-icon>
    </button>
    <div
      class="fixed top-0 left-0 z-40"
      :class="{
        'w-full h-full': isMobile,
        'w-1/2': !isMobile,
        hidden: !isOpen,
      }"
    >
      <div class="bg-white h-full shadow-xl overflow-auto p-4">
        <h2 class="text-lg font-bold mb-4">Carrinho de Compras</h2>
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between items-center mb-2"
        >
          <div></div>
        </div>
        <div class="mt-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import { useWindowSize } from "@vueuse/core";

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => [],
  },
});

const isOpen = ref(false);
const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const total = computed(() => {
  return props.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

const toggleCart = () => {
  isOpen.value = !isOpen.value;
};

const removeItem = (id) => {
  const index = props.cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    props.cartItems.splice(index, 1);
  }
};

const goToStep2 = () => {
  console.log("Navega para o passo 2");
  // Implementar navegação para o passo 2 (detalhes de entrega e pagamento)
};
</script>
