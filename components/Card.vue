<template>
  <div class="col-span-12 sm:col-span-6 md:col-span-1">
    <div class="mx-auto my-12 max-w-sm shadow-lg rounded-lg overflow-hidden">
      <div class="relative h-64">
        <v-img cover class="rounded-t-lg" :src="item.imageUrl" />
        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
          <h3 class="text-white text-lg">{{ item.name }}</h3>
        </div>
      </div>
      <div class="p-4 bg-white">
        <p class="text-gray-700 mb-2">{{ item.description }}</p>
        <p class="text-primary mb-4">R$ {{ computedPrice }} <span v-if="item.category === 'salgado || doces'">Und</span></p>

        <!-- Quantidade para salgados e doces -->
        <div v-if="item.category !== 'bebidas'" class="flex gap-2 mb-4 justify-center">
          <button v-for="quantity in quantities" :key="quantity" @click="updateSelectedQuantity(quantity)"
            :class="buttonClasses(quantity === selectedQuantity)">
            {{ quantity }}
          </button>
        </div>

        <!-- Volume para bebidas -->
        <div v-if="item.category === 'bebidas'" class="flex gap-2 mb-4 justify-center">
          <button v-for="(value, volume) in beverageOptions" :key="volume" @click="updateSelectedVolume(volume)"
            :class="buttonClasses(volume === selectedVolume)">
            {{ volume }}
          </button>
        </div>

        <!-- Botão de adicionar ao carrinho -->
        <button :disabled="!canAddToCart" @click="emitAddToCart"
          class="bg-green-600 text-white w-full py-2 mt-2 rounded hover:bg-green-700 disabled:bg-green-300">
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
const selectedVolume = ref('');

const computedPrice = computed(() => {
  if (props.item.category === 'bebidas' && selectedVolume.value) {
    return beverageOptions[selectedVolume.value];
  }
  return selectedQuantity.value >= 100 ? props.item.bulkPrice : props.item.price;
});

const canAddToCart = computed(() => {
  return props.item.category === 'bebidas'
    ? Boolean(selectedVolume.value)
    : selectedQuantity.value >= 15;
});

function updateSelectedQuantity(quantity) {
  selectedQuantity.value = quantity;
  selectedVolume.value = '';
}

function updateSelectedVolume(volume) {
  selectedVolume.value = volume;
  selectedQuantity.value = 1; // Set to 1 since it's a beverage
}

function buttonClasses(condition) {
  return {
    'bg-purple-200 text-white rounded-full px-3 py-1 hover:bg-purple-400 active:bg-purple-600 focus:bg-purple-800': true,
    'bg-deep-purple-200': condition,
  };
}

function emitAddToCart() {
  if (!canAddToCart.value) return;

  emits('add-to-cart', {
    item: props.item,
    quantity: props.item.category === 'bebidas' ? 1 : selectedQuantity.value,
    pricePerUnit: computedPrice.value,
  });
}
</script>

<style>
/* Sinta-se à vontade para adicionar mais estilos se necessário */
</style>
