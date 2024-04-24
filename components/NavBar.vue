<template>
  <Disclosure as="nav" class="bg-base-300">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 justify-between">
        <div class="flex text-sm bg-transparent">
          <Cart :cartItems=" cartItems" />
        </div>

      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ArrowUpRightIcon,
} from "@heroicons/vue/24/outline";

import { UserCircleIcon } from "@heroicons/vue/24/solid";
import Cart from "./Cart.vue";
import requests from "./requests.vue";
import { defineProps } from "vue";
const props = defineProps({
  cartItems: Array,
});
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
