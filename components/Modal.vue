<template>
  <div class="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50" @click.self="closeModal">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl w-11/12 md:w-1/2">
      <div class="relative">
        <img class="h-64 w-full object-cover" :src="item.imageUrl" />
      </div>
      <div class="p-6">
        <h3 class="text-2xl font-semibold">{{ item.name }}</h3>
        <p class="mt-2 text-gray-600">{{ item.description }}</p>
        <div v-if="item.category !== 'bebidas'" class="mt-4">
          <h4 class="text-lg font-semibold">Escolha a quantidade:</h4>
          <div class="flex flex-wrap gap-2 mt-2">
            <button v-for="quantity in quantities" :key="quantity" @click="selectQuantity(quantity)"
              :class="['text-xs px-3 py-1 rounded-full', selectedQuantity === quantity ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300']">
              {{ quantity }} Unid
            </button>
          </div>
        </div>
        <div v-else class="mt-4">
          <h4 class="text-lg font-semibold">Escolha o tamanho:</h4>
          <select v-model="selectedVolume" class="w-full p-2 border rounded mt-2">
            <option value="2L">2L</option>
            <option value="600ml">600ml</option>
            <option value="Lata">Lata</option>
          </select>
          <div class="flex items-center mt-2">
            <button @click="decreaseQuantity" class="text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center">-</button>
            <span class="mx-4">{{ selectedQuantity }} {{ selectedVolume }}</span>
            <button @click="increaseQuantity" class="text-gray-500 border rounded-full w-8 h-8 flex items-center justify-center">+</button>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-lg">Preço: R$ {{ computedPrice }}</p>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="closeModal" class="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300">
            Cancelar
          </button>
          <button @click="addToCart"
            class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
            Adicionar ao Carrinho - R$ {{ computedPrice }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close-modal', 'add-to-cart']);

const selectedQuantity = ref(props.item.category === 'bebidas' ? 1 : 15);
const selectedVolume = ref('2L');

const quantities = [15, 25, 50, 75, 100];

const computedPrice = computed(() => {
  if (props.item.category !== 'bebidas') {
    const pricePerUnit = selectedQuantity.value >= 100 ? 0.57 : 0.65;
    return (selectedQuantity.value * pricePerUnit).toFixed(2);
  } else {
    const volumePrices = {
      '2L': 10.00,
      '600ml': 6.00,
      'Lata': 3.00,
    };
    return (selectedQuantity.value * volumePrices[selectedVolume.value]).toFixed(2);
  }
});

function selectQuantity(quantity) {
  if (props.item.category !== 'bebidas') {
    selectedQuantity.value = quantity;
  }
}

function decreaseQuantity() {
  if (props.item.category !== 'bebidas') {
    if (selectedQuantity.value > 15) {
      selectedQuantity.value -= 15;
    }
  } else {
    if (selectedQuantity.value > 1) {
      selectedQuantity.value--;
    }
  }
}

function increaseQuantity() {
  if (props.item.category !== 'bebidas') {
    if (selectedQuantity.value < 100) {
      selectedQuantity.value += 15;
    }
  } else {
    selectedQuantity.value++;
  }
}

function closeModal() {
  emit('close-modal');
}

function addToCart() {
  emit('add-to-cart', {
    item: props.item,
    quantity: selectedQuantity.value,
    totalPrice: computedPrice.value,
    detail: props.item.category === 'bebidas' ? selectedVolume.value : '',
  });
  closeModal();
}
</script>

<style scoped>
/* Adicione estilos específicos, se necessário */
</style>
