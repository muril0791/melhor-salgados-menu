import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(item, quantity, totalPrice, detail) {
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.detail === detail
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = (
          parseFloat(existingItem.totalPrice) + parseFloat(totalPrice)
        ).toFixed(2);
      } else {
        this.cartItems.push({ ...item, quantity, totalPrice, detail });
      }
      this.saveCartItems();
    },
    saveCartItems() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    loadCartItems() {
      const savedItems = localStorage.getItem("cartItems");
      if (savedItems) {
        this.cartItems = JSON.parse(savedItems);
      }
    },
    removeItem(id, detail) {
      this.cartItems = this.cartItems.filter(
        (item) => !(item.id === id && item.detail === detail)
      );
      this.saveCartItems();
    },
    clearCart() {
      this.cartItems = [];
      this.saveCartItems();
    },
  },
});
