<template>
  <NavBar :cartItems="cartItems" />
  <!-- <v-img :width="300" aspect-ratio="16/9" cover style="
      display: flex;
      border: red;
      background-color: grey;
      z-index: 99999;
      width: 200px;
      height: 200px;
    " src="../assets/teste.jpg"></v-img> -->
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
      imageUrl:
        "https://cdn0.tudoreceitas.com/pt/posts/1/9/1/coxinha_simples_191_orig.jpg  ",
      name: "Coxinha",
      description: "Um delicioso salgado de frango.",
      price: "0.65",
      bulkPrice: "0.57",
      category: "salgados",
    },
    {
      id: 2,
      imageUrl:
        "https://www.meucadernodereceitas.com.br/wp-content/uploads/2023/05/receita-de-bolinha-de-queijo.webp",
      name: "Bolinha do queijo",
      description: "Um Delicioso bolinho de queijo.",
      price: "0.65",
      bulkPrice: "0.57",
      category: "salgados",
    },
    {
      id: 3,
      imageUrl: "https://img.cybercook.com.br/receitas/576/kibe.jpeg",
      name: "kibe",
      description: "Spicy beef kibe.",
      price: "0.65",
      bulkPrice: "0.57",
      category: "salgados",
    },
    {
      id: 4,
      imageUrl:
        "https://i.pinimg.com/736x/1c/c5/bc/1cc5bc73492bbbea5f2550832d60f2c9.jpg",
      name: "Risoles de presunto e queijo",
      description: " Ham and cheese rissole.",
      price: "0.65",
      bulkPrice: "0.57",
      category: "salgados",
    },
    {
      id: 5,
      imageUrl:
        "https://saborecia.com.br/wp-content/uploads/2020/06/image-41.png",
      name: "Enroladinho de Salsicha",
      description: "Sausage roll.",
      price: "0.65",
      bulkPrice: "0.57",
      category: "salgados",
    },
  ],
  doces: [
    {
      id: 6,
      imageUrl:
        "https://www.sabornamesa.com.br/media/k2/items/cache/ad14e3f1ea53ec7346e0758c14413a30_XL.jpg",
      name: "Mini Churros",
      description: "Chocolate brigadeiro.",
      price: "0.65",
      bulkPrice: "0.57",
      category: "salgados",
    },
  ],
  bebidas: [
    {
      id: 11,
      imageUrl: "../assets/images/bebidas/coca-cola.jpg",
      name: "Coca-cola",
      description: "Freshly brewed coffee.",
      price: "10.00",
      category: "bebidas",
    },
    {
      id: 12,
      imageUrl: "../assets/images/bebidas/cerveja.jpg",
      name: "Cerveja",
      description: "Freshly brewed coffee.",
      price: "12.00",
      category: "bebidas",
    },
    {
      id: 13,
      imageUrl: "../assets/images/bebidas/fanta.jpg",
      name: "Fanta",
      description: "Freshly brewed coffee.",
      price: "9.00",
      category: "bebidas",
    },
    {
      id: 14,
      imageUrl: "../assets/images/bebidas/guarana.jpg",
      name: "Guarana",
      description: "Freshly brewed coffee.",
      price: "11.50",

      category: "bebidas",
    },
    {
      id: 15,
      imageUrl: "../assets/images/bebidas/agua.jpg",
      name: "Agua",
      description: "Freshly brewed coffee.",
      price: "3.50",
      category: "bebidas",
    },
  ],
});
const cartItems = reactive([]);
const category = ref("salgados");

function showSnackbar() {
  snackbarRef.value.showSnackbar("Mensagem de exemplo");
}
const addToCart = ({ item, quantity }) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...item, quantity });
  }
  snackbarRef.value.showSnackbar(
    `Item adicionado ao carrinho! ${quantity} ${item.name}`
  );
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
  const savedItems = localStorage.getItem("cartItems");
  if (savedItems) {
    const items = JSON.parse(savedItems);
    cartItems.splice(0, cartItems.length, ...items);
  }
}

function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
</script>

<style>
/* Your styles here */
</style>
