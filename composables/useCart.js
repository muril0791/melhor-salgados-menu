import { ref, computed } from "vue";
import { useCartStore } from "@/store/index";

export function useCart() {
  const cartStore = useCartStore();
  const total = computed(() => {
    return (
      cartStore?.cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ) || 0
    );
  });

  const addToCart = (item, quantity) => {
    cartStore.addToCart(item, quantity);
  };

  const removeItem = (item) => {
    const index = cartStore.cartItems.indexOf(item);
    if (index > -1) {
      cartStore.cartItems.splice(index, 1);
    }
  };

  const clearCart = () => {
    cartStore.clearCart();
  };

  return {
    total,
    addToCart,
    removeItem,
    clearCart,
  };
}
