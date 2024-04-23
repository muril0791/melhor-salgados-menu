<template>
  <div>
    <span class="uppercase font-bold tracking-wide">{{
      "menu.theme.label"
    }}</span>
    <Listbox as="div" v-model="colorMode.preference">
      <div class="relative mt-2">
        <ListboxButton
          class="relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-base-content shadow-sm ring-1 ring-inset ring-base-200 bg-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <span class="flex items-center">
            <span class="block truncate capitalize">{{
              colorMode.preference
            }}</span>
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-base-300 py-1 text-base-content shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="theme in themes"
              :key="theme"
              :value="theme"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  active
                    ? 'bg-indigo-600 text-neutral-content'
                    : 'text-base-content ',
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                ]"
              >
                <div class="flex items-center">
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate capitalize',
                    ]"
                    >{{ theme }}</span
                  >
                </div>

                <span
                  v-if="selected"
                  :class="[
                    active ? 'text-white' : 'text-indigo-600',
                    'absolute inset-y-0 right-0 flex items-center pr-4',
                  ]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
const colorMode = useColorMode();
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "system",
];
</script>
<style lang="scss" scoped>
.dark {
  .theme {
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
}
</style>
