<template>
    <v-tabs v-model="selectedTab" background-color="transparent" class="text-capitalize">
        <v-tab @click="updateTab('salgados')">Salgados</v-tab>
        <v-tab @click="updateTab('doces')">Doces</v-tab>
        <v-tab @click="updateTab('bebidas')">Bebidas</v-tab>
    </v-tabs>
</template>

<script setup>
import { ref } from 'vue';

const selectedTab = ref('salgados');

const emit = defineEmits(['update:category']);

const updateTab = (tab) => {
    selectedTab.value = tab;
    emit('update:category', tab);
};
</script>
