<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden group transform hover:scale-105 transition-transform duration-300">
    <div class="relative">
      <img class="h-48 w-full object-cover" :src="item.imageUrl" />
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ item.name }}</h3>
      <p class="text-sm text-gray-600">{{ item.shortDescription }}</p>
      <button @click="openModal"
        class="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300">
        Ver detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['open-modal']);

function openModal() {
  emit('open-modal', props.item);
}
</script>
