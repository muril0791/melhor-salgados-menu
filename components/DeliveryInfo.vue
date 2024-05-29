<template>
    <div>
        <h2>Informações de Entrega</h2>
        <form @submit.prevent="submitOrder">
            <input v-model="customerName" placeholder="Nome" required>
            <input v-model="phoneNumber" placeholder="Número de telefone" required>
            <select v-model="deliveryMethod">
                <option value="retirada">Retirada</option>
                <option value="entrega">Entrega</option>
            </select>
            <div v-if="deliveryMethod === 'entrega'">
                <input v-model="cep" placeholder="CEP" required>
                <input v-model="address" placeholder="Endereço" required>
            </div>
            <select v-model="paymentMethod">
                <option value="cartao">Cartão de Crédito/Débito</option>
                <option value="pix">PIX</option>
            </select>
            <button type="submit">Confirmar Pedido</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const customerName = ref('');
const phoneNumber = ref('');
const deliveryMethod = ref('retirada');
const cep = ref('');
const address = ref('');
const paymentMethod = ref('cartao');

function submitOrder() {
    console.log('Pedido submetido');
    // Navega para a etapa 3 (confirmação do pedido)
}
</script>
