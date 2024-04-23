<template>
  <transition name="slide" appear>
    <div v-if="isVisible"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg bg-blue-500 text-white text-center"
      @click="hide">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref("");

function showSnackbar(newMessage) {
  message.value = newMessage;
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
}

function hide() {
  isVisible.value = false;
}

defineExpose({
  showSnackbar
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
