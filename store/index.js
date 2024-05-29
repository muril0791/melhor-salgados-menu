import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    category: "salgados",
  }),
  actions: {
    addToCart(item, quantity) {
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({ ...item, quantity });
      }
      this.saveCartItems();
    },
    updateCategory(newCategory) {
      this.category = newCategory;
    },
    loadCartItems() {
      const savedItems = localStorage.getItem("cartItems");
      if (savedItems) {
        this.cartItems = JSON.parse(savedItems);
      }
    },
    saveCartItems() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      this.saveCartItems();
    },
    clearCart() {
      this.cartItems = [];
      this.saveCartItems();
    },
  },
});
