<template>
  <NavBar :cartItems="cartItems" />
  <section style="display: flex; justify-content: center">
    <CategoryMenu @update:category="updateCategory" />
  </section>
  <v-container>
    <v-row>
      <Card v-for="item in items[category]" :key="item.id" :item="item" @add-to-cart="addToCart" />
    </v-row>
  </v-container>
</template>


<script setup>
import { reactive, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import CategoryMenu from "@/components/Menu/CategoryMenu.vue";
import Card from "@/components/Card.vue";

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
      id: 11,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 11,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 11,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
    {
      id: 11,
      imageUrl: "https://picsum.photos/10/6?image=5",
      name: "Coffee",
      description: "Freshly brewed coffee.",
      price: "1.50",
      category: "bebidas",
    },
  ],
});

// Reactive cartItems array
const cartItems = reactive([
  // Exemplo de itens
  { id: 1, name: 'Produto 1', price: 10.00, quantity: 2 },
  { id: 2, name: 'Produto 2', price: 15.00, quantity: 1 }
]);


const addToCart = (item) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ ...item, quantity: 1 });
  }
};

// Reactive category
const category = ref("salgados");

const updateCategory = (newCategory) => {
  category.value = newCategory;
};
</script>

<style>
/* Your styles here */
</style>
