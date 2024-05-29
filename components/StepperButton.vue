<template>
    <div class="stepper flex items-center">
        <button @click="decrement" :disabled="value === min" class="stepper-button p-2">
            <v-icon>mdi-minus</v-icon>
        </button>
        <span class="stepper-value mx-2">{{ value }}</span>
        <button @click="increment" :disabled="value === max" class="stepper-button p-2">
            <v-icon>mdi-plus</v-icon>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});

function increment() {
    if (value.value < props.max) {
        value.value++;
    }
}

function decrement() {
    if (value.value > props.min) {
        value.value--;
    }
}
</script>

<style scoped>
.stepper {
    border: 1px solid #000;
    border-radius: 20px;
    background: rgba(245, 245, 245, 0.774);
    color: #000;
    max-width: 120px;
    height: 35px;
}

.stepper-button {
    font-size: 18px;
    color: black;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.stepper-button:disabled {
    color: rgb(168, 168, 168);
}

.stepper-value {
    padding: 0 20px;
}
</style>
