<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img :src="item.imageUrl" height="250" cover>
        <v-card-title>{{ item.name }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ item.description }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ item.price }}</div>
        <div v-if="item.category !== 'bebidas'">
          <v-chip-group v-model="selectedQuantity" selected-class="bg-deep-purple-lighten-2">
            <v-chip v-for="quantity in quantities" :key="quantity">{{ quantity }}</v-chip>
          </v-chip-group>
        </div>
        <div v-else>
          <StepperButton :initial-value="1" :min="1" :max="100" @update:value="updateQuantity" />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange darken-2" text @click="addToCart(item, selectedQuantity)">
          Add to Cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
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
const selectedQuantity = ref(15);

const updateQuantity = (newQuantity) => {
  selectedQuantity.value = newQuantity;
};

function addToCart(item, quantity) {
  emits("add-to-cart", { ...item, quantity });
}
</script>
