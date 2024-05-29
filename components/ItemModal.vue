<template>
    <v-dialog v-model="visible" persistent max-width="600px">
        <v-card>
            <v-card-title>
                {{ item.name }}
                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                {{ item.description }}
                <StepperButton :initial-value="item.quantity" @update:value="updateQuantity" />
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="updateCart">Save Changes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import StepperButton from './StepperButton.vue';

const props = defineProps({
    item: Object
});

const visible = ref(true);
const emit = defineEmits(['update-cart', 'close']);

function updateQuantity(newQuantity) {
    props.item.quantity = newQuantity;
}

function close() {
    visible.value = false;
    emit('close');
}

function updateCart() {
    emit('update-cart', props.item);
    close();
}

watch(() => props.item, (newVal) => {
    if (!newVal) visible.value = false;
});
</script>
