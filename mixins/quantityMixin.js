export const quantityMixin = {
  data() {
    return {
      selectedQuantity: 1,
    };
  },
  methods: {
    increaseQuantity() {
      this.selectedQuantity++;
    },
    decreaseQuantity() {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--;
      }
    },
  },
};
