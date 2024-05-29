<template>
  <Disclosure as="nav" class="bg-base-300">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Cart :cartItems="cartStore.cartItems" />
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure } from '@headlessui/vue';
import { useCartStore } from '@/store/index';
import Cart from './Cart.vue';

const cartStore = useCartStore();
</script>

<style lang="scss" scoped>
.dark {
  .theme {
    .active {
      background: #94a3b8;
    }
  }

  .language {
    .active {
      background: #94a3b8;
    }
  }
}

.light {
  .theme {
    .active {
      background: #e5e7eb;
    }
  }

  .language {
    .active {
      background: #e5e7eb;
    }
  }
}
</style>
