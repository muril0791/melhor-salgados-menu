<template>
    <div>
        <h2>Confirmação do Pedido</h2>
        <p>Nome: {{ customerName }}</p>
        <!-- Outros detalhes do pedido -->
        <textarea placeholder="Observações"></textarea>
        <button @click="finalizeOrder">Finalizar Pedido</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const customerName = ref('');

const finalizeOrder = () => {
    console.log('Pedido finalizado');
    // Implementar lógica de finalização e navegar para a tela de status do pedido
};
</script>
