<template>
  <div class="col">
    <div class="bg-white rounded-lg shadow overflow-hidden group">
      <div class="relative">
        <img class="h-48 w-full object-cover" :src="item.imageUrl" />
        <button class="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-600">
          <v-icon>mdi-heart</v-icon>
        </button>
      </div>
      <div class="px-4 py-2">
        <h3 class="mt-2 text-lg font-semibold">{{ item.name }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
        <div class="mt-3 flex justify-between items-center">
          <span v-if="item.category !== 'bebidas'" class="text-xl font-semibold">R$ {{ computedPrice }} - {{
            computedPrice / selectedQuantity }} Und</span>
          <span v-else class="text-xl font-semibold">R$ {{ computedPrice }}</span>
          <div v-if="item.category === 'bebidas'">
            <button @click="decreaseQuantity" class="text-gray-500">-</button>
            <span class="mx-2">{{ selectedQuantity }}</span>
            <button @click="increaseQuantity" class="text-gray-500">+</button>
          </div>
        </div>
        <div v-if="item.category === 'bebidas'" class="mt-3">
          <select v-model="selectedVolume"
            class="w-full p-2 bg-white border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500">
            <option disabled value="">Select volume</option>
            <option v-for="(price, volume) in beverageOptions" :key="volume" :value="volume">
              {{ volume }}
            </option>
          </select>
        </div>
        <div v-else class="mt-3 flex gap-2">
          <button v-for="quantity in quantities" :key="quantity" @click="updateSelectedQuantity(quantity)"
            :class="['text-xs px-3 py-1 rounded-full', selectedQuantity === quantity ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300']">
            {{ quantity }} Unid
          </button>
        </div>
        <button :disabled="!canAddToCart" @click="emitAddToCart"
          class="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['add-to-cart']);

const quantities = [15, 25, 50, 75, 100];
const beverageOptions = {
  '2L': 10.00,
  '600ml': 6.00,
  'Lata': 3.00,
};

const selectedQuantity = ref(props.item.category === 'bebidas' ? 1 : 15);
const selectedVolume = ref('2L'); // Pre-select '2L' for beverages

const computedPrice = computed(() => {
  if (props.item.category === 'bebidas' && selectedVolume.value) {
    return (selectedQuantity.value * beverageOptions[selectedVolume.value]).toFixed(2);
  }
  return (selectedQuantity.value * (selectedQuantity.value >= 100 ? props.item.bulkPrice : props.item.price)).toFixed(2);
});

const canAddToCart = computed(() => {
  return props.item.category === 'bebidas'
    ? Boolean(selectedVolume.value) && selectedQuantity.value > 0
    : selectedQuantity.value >= 15;
});

function updateSelectedQuantity(quantity) {
  selectedQuantity.value = quantity;
}

function increaseQuantity() {
  if (selectedQuantity.value < 100) {
    selectedQuantity.value++;
  }
}

function decreaseQuantity() {
  if (selectedQuantity.value > 1) {
    selectedQuantity.value--;
  }
}

function emitAddToCart() {
  if (canAddToCart.value) {
    emits('add-to-cart', {
      item: props.item,
      quantity: selectedQuantity.value,
      volume: selectedVolume.value,
      pricePerUnit: computedPrice.value,
      detail: `${props.item.name} ${selectedVolume.value}`
    });
    selectedQuantity.value = props.item.category === 'bebidas' ? 1 : 15; // Reset for next interaction
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
