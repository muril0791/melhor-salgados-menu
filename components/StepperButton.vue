<template>
    <div class="stepper">
        <button @click="decrement" :disabled="value === min" class="stepper-button">
            <v-icon>mdi-minus</v-icon>
        </button>
        <span class="stepper-value">{{ value }}</span>
        <button @click="increment" :disabled="value === max" class="stepper-button">
            <v-icon>mdi-plus</v-icon>
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
    initialValue: {
        type: Number,
        default: 0,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    }
});
const emit = defineEmits(['update:value']);
const value = ref(props.initialValue);

watch(props.initialValue, (newVal) => {
    value.value = newVal;
});

function increment() {
    if (value.value < props.max) {
        value.value++;
        emit('update:value', value.value);
    }
}

function decrement() {
    if (value.value > props.min) {
        value.value--;
        emit('update:value', value.value);
    }
}
</script>

<style>
.stepper {
    display: flex;
    align-items: center;
    border: 1.5px solid #000000;
    border-radius: 20px;
    justify-content: center;
    background: rgba(245, 245, 245, 0.774);
    color: #000000;
    max-width: 120px;
    height: 35px;
    padding-left: 6px;
    padding-right: 6px;
}

.stepper-button {
    font-size: 18px;
    color: white;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: black;
}

.stepper-button:disabled {
    color: rgb(168, 168, 168);
}

.stepper-value {
    padding: 0 20px;
}
</style>
