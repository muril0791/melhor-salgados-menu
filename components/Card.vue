<template>
  <div class="col-span-12 sm:col-span-6 md:col-span-1">
    <div class="mx-auto my-12 max-w-sm">
      <div class="h-64 bg-cover" :style="{ backgroundImage: `url(${item.imageUrl})` }">
        <div class="bg-black bg-opacity-50 flex justify-between items-end h-full p-4">
          <h3 class="text-white text-lg">{{ item.name }}</h3>
        </div>
      </div>

      <div class="p-4 bg-white rounded-t-3xl">
        <p class="text-gray-700 mb-2">{{ item.description }}</p>
        <p class="text-primary mb-4">{{ computedPrice }}</p>

        <div v-if="item.category !== 'bebidas'">
          <div class="flex gap-2 mb-4 flex justify-center">
            <button
              class="bg-purple-200 text-white rounded-full px-3 py-1 hover:bg-purple-400 active:bg-purple-600 focus:bg-purple-800"
              v-for="quantity in quantities" :key="quantity" @click="updateSelectedQuantity(quantity)"
              :class="{ 'bg-deep-purple-200': selectedQuantity === quantity }">
              {{ quantity }}
            </button>
          </div>
        </div>
        <div v-else>
          <StepperButton :initial-value="1" :min="1" :max="100" @update:value="updateSelectedQuantity" />
        </div>

        <button class="bg-green-600 text-white px-4 py-2 mt-2 rounded-full w-full hover:bg-green-700"
          @click="emitAddToCart(item)">
          <v-icon>mdi-cart-arrow-down</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
import StepperButton from './StepperButton.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["add-to-cart"]);
const quantities = [15, 25, 50, 75, 100];
const selectedQuantity = ref(15); // Initial quantity for items not beverages

const computedPrice = computed(() => {
  return selectedQuantity.value >= 100 ? props.item.bulkPrice : props.item.price;
});

function updateSelectedQuantity(newQuantity) {
  selectedQuantity.value = newQuantity;
}

function emitAddToCart() {
  emits("add-to-cart", { item: props.item, quantity: selectedQuantity.value, pricePerUnit: computedPrice.value });
}
</script>
