<template>
  <Disclosure as="nav" class="bg-base-300">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div>
          <Cart :cartItems="cartItems" />
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
        <div class="absolute inset-y-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div>
            <requests />
          </div>
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full text-sm bg-transparent">
                <UserCircleIcon class="block text-base-content h-8 w-8" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute left-0 z-10 mt-2 w-60 p-4 origin-top-right rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="grid grid-cols-1">
                  <MenuThemeSelector />
                </div>
              </MenuItems>
            </transition>
          </Menu>

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
