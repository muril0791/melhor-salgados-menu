<template>
    <div>
        <div v-if="step === 1">
            <!-- Formulário de detalhes do pedido -->
        </div>
        <div v-if="step === 2">
            <!-- Formulário de pagamento -->
        </div>
        <div v-if="step === 3">
            <!-- Confirmação e envio do pedido -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const step = ref(1);

const nextStep = () => {
    if (step.value < 3) {
        step.value += 1;
    }
};

const prevStep = () => {
    if (step.value > 1) {
        step.value -= 1;
    }
};

const confirmOrder = () => {
    // Envie o pedido
    console.log('Pedido confirmado');
};
</script>
