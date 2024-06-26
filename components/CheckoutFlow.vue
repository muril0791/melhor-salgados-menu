<template>
    <div>
        <div v-if="step === 'personalInfo'">
            <h2 class="text-2xl font-bold mb-4">Personal Information</h2>
            <input v-model="personalInfo.name" placeholder="Name" class="w-full p-2 mb-4 border rounded" />
            <input v-model="personalInfo.phone" placeholder="Phone" class="w-full p-2 mb-4 border rounded" />
            <input v-model="personalInfo.cpf" placeholder="CPF" class="w-full p-2 mb-4 border rounded" />
            <button class="w-full bg-green-600 text-white py-3 rounded mt-6 hover:bg-green-700 transition"
                @click="nextStep" :disabled="!isPersonalInfoValid">Next</button>
        </div>

        <div v-if="step === 'deliveryInfo'">
            <h2 class="text-2xl font-bold mb-4">Delivery Information</h2>
            <div>
                <label class="block mb-2">Delivery Method</label>
                <select v-model="deliveryMethod" class="w-full p-2 mb-4 border rounded">
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                </select>
            </div>
            <div v-if="deliveryMethod === 'delivery'">
                <input v-model="deliveryInfo.address" placeholder="Address" class="w-full p-2 mb-4 border rounded" />
                <input v-model="deliveryInfo.zipCode" placeholder="ZIP Code" class="w-full p-2 mb-4 border rounded" />
                <input v-model="deliveryInfo.city" placeholder="City" class="w-full p-2 mb-4 border rounded" />
            </div>
            <button class="w-full bg-green-600 text-white py-3 rounded mt-6 hover:bg-green-700 transition"
                @click="nextStep" :disabled="!isDeliveryInfoValid">Next</button>
        </div>

        <div v-if="step === 'paymentInfo'">
            <h2 class="text-2xl font-bold mb-4">Payment Information</h2>
            <div>
                <label class="block mb-2">Payment Method</label>
                <select v-model="paymentMethod" class="w-full p-2 mb-4 border rounded">
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                    <option value="pix">PIX</option>
                    <option value="cash">Cash</option>
                </select>
            </div>
            <div v-if="paymentMethod === 'cash'">
                <input v-model="cashInfo.amount" placeholder="Cash Amount" class="w-full p-2 mb-4 border rounded" />
                <p class="text-sm text-gray-500">* Ensure you have the exact amount or the change</p>
            </div>
            <button class="w-full bg-green-600 text-white py-3 rounded mt-6 hover:bg-green-700 transition"
                @click="confirmPayment" :disabled="!isPaymentInfoValid">Confirm</button>
        </div>

        <!-- Snackbar -->
        <Snackbar ref="snackbarRef" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Snackbar from '@/components/Snackbar.vue';

const step = ref('personalInfo');

const personalInfo = ref({
    name: '',
    phone: '',
    cpf: '',
});

const deliveryMethod = ref('pickup');

const deliveryInfo = ref({
    address: '',
    zipCode: '',
    city: '',
});

const paymentMethod = ref('');
const cashInfo = ref({
    amount: '',
});

const snackbarRef = ref(null);

const emit = defineEmits(['finalizeOrder']);

const isPersonalInfoValid = computed(() => {
    return personalInfo.value.name && personalInfo.value.phone && personalInfo.value.cpf;
});

const isDeliveryInfoValid = computed(() => {
    if (deliveryMethod.value === 'pickup') return true;
    return deliveryInfo.value.address && deliveryInfo.value.zipCode && deliveryInfo.value.city;
});

const isPaymentInfoValid = computed(() => {
    if (paymentMethod.value === 'cash') return cashInfo.value.amount;
    return paymentMethod.value;
});

function nextStep() {
    if (step.value === 'personalInfo') {
        if (isPersonalInfoValid.value) step.value = 'deliveryInfo';
    } else if (step.value === 'deliveryInfo') {
        if (isDeliveryInfoValid.value) step.value = 'paymentInfo';
    }
}

function confirmPayment() {
    if (isPaymentInfoValid.value) {
        snackbarRef.value.showSnackbar({
            message: 'Payment will be made on delivery',
            actionText: 'OK',
        });
        emit('finalizeOrder', {
            personalInfo: personalInfo.value,
            deliveryMethod: deliveryMethod.value,
            deliveryInfo: deliveryInfo.value,
            paymentMethod: paymentMethod.value,
            cashInfo: cashInfo.value,
        });
    } else {
        snackbarRef.value.showSnackbar({
            message: 'Please fill in all the required fields.',
            actionText: 'OK',
        });
    }
}
</script>

<style scoped>
button {
    cursor: pointer;
}
button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
