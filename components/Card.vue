<template>
  <div class="col-span-12 sm:col-span-6 md:col-span-1">
    <div class="mx-auto my-12 max-w-sm">
      <div class="h-64 bg-cover" :style="{ backgroundImage: `url(${item.imageUrl})` }">
        <div class="bg-black bg-opacity-50 flex justify-between items-end h-full p-4">
          <h3 class="text-white text-lg">{{ item.name }}</h3>
        </div>
      </div>

      <div class="p-4 bg-white">
        <p class="text-gray-700 mb-2">{{ item.description }}</p>
        <p class="text-primary mb-4">{{ item.price }}</p>

        <div v-if="item.category !== 'bebidas'">
          <div class="flex gap-2 mb-4">
            <button
              class="bg-purple-200 text-white-100 rounded-full px-3 py-1 hover:bg-purple-400 active:bg-purple-600 focus:bg-purple-800"
              v-for="quantity in quantities" :key="quantity" @click="updateSelectedQuantity(quantity)"
              :class="{ 'bg-deep-purple-200': selectedQuantity === quantity }">
              {{ quantity }}
            </button>
          </div>
        </div>
        <div v-else>
          <StepperButton :initial-value="1" :min="1" :max="100" @update:value="updateSelectedQuantity" />
        </div>

        <button class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" @click="emitAddToCart(item)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
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

function updateSelectedQuantity(newQuantity) {
  selectedQuantity.value = newQuantity;
}

function emitAddToCart() {
  emits("add-to-cart", { item: props.item, quantity: selectedQuantity.value });
}
</script>
