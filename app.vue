<template>
  <NavBar :cartItems="cartItems" />
  <section style="display: flex; justify-content: center">
    <CategoryMenu @update:category="updateCategory" />
  </section>
  <div>
    <Snackbar ref="snackbarRef" />
  </div>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card v-for="item in items[category]" :key="item.id" :item="item" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import CategoryMenu from "@/components/Menu/CategoryMenu.vue";
import Card from "@/components/Card.vue";
import Snackbar from "@/components/Snackbar.vue";

const snackbarRef = ref(null);
const items = reactive({
  salgados: [
    {
      id: 1,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coxinha",
      description: "Delicious chicken coxinha.",
      price: "2.50",
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Pastel",
      description: "Crispy cheese pastel.",
      price: "3.00",
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Kibe",
      description: "Spicy beef kibe.",
      price: "2.75",
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Empada",
      description: "Shrimp empada.",
      price: "3.25",
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Esfiha",
      description: "Delicious esfiha with beef.",
      price: "3.00",
    },
  ],
  doces: [
    {
      id: 6,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Brigadeiro",
      description: "Chocolate brigadeiro.",
      price: "1.50",
    },
    {
      id: 7,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Beijinho",
      description: "Sweet coconut beijinho.",
      price: "1.50",
    },
    {
      id: 8,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Quindim",
      description: "Egg yolk and coconut quindim.",
      price: "2.00",
    },
    {
      id: 9,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Pudim",
      description: "Caramelized milk pudding.",
      price: "3.50",
    },
    {
      id: 10,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Bolo de Rolo",
      description: "Guava roll cake.",
      price: "4.00",
    },
  ],
  bebidas: [
    {
      id: 11,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 12,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 13,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 14,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 15,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
  ],
});
const cartItems = reactive([]);
const category = ref("salgados");

function showSnackbar() {
  snackbarRef.value.showSnackbar('Mensagem de exemplo');
}
const addToCart = ({ item, quantity }) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...item, quantity });
  }
  snackbarRef.value.showSnackbar(`Added ${quantity} ${item.name} to cart!`);
  saveCartItems();
};

const updateCategory = (newCategory) => {
  category.value = newCategory;
};

onMounted(() => {
  if (process.client) {
    loadCartItems();
  }
});

watchEffect(() => {
  if (process.client && cartItems.length > 0) {
    saveCartItems();
  }
});

function loadCartItems() {
  const savedItems = localStorage.getItem('cartItems');
  if (savedItems) {
    const items = JSON.parse(savedItems);
    cartItems.splice(0, cartItems.length, ...items);
  }
}

function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
</script>

<style>
/* Your styles here */
</style>
