import { create } from "zustand";

// export const useCartStore = create((set) => ({
//   cart: [],
//   addToCart: (item) =>
//     set((state) => ({
//       cart: [...state.cart, item],
//     })),
//   removeFromCart: (itemId) =>
//     set((state) => ({
//       cart: state.cart.filter((i) => i.id !== itemId),
//     })),
//   incrementItem: (itemId) =>
//     set((state) => ({
//       cart: state.cart.map((i) => {
//         if (i.id === itemId) {
//           return { ...i, quantity: i.quantity + 1 };
//         }
//         return i;
//       }),
//     })),
//   decrementItem: (itemId) =>
//     set((state) => ({
//       cart: state.cart.map((i) => {
//         if (i.id === itemId) {
//           return { ...i, quantity: i.quantity - 1 };
//         }
//         return i;
//       }),
//     })),
// }));

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i._id === item._id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i._id === item._id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      localStorage.setItem("cart", JSON.stringify([...state.cart, item]));
      return { cart: [...state.cart, item] };
    }),
  incrementItem: (id) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  decrementItem: (id) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
}));
