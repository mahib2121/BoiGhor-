import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart(state, action) {
            const book = action.payload;
            const item = state.items.find(i => i._id === book._id);

            if (item) {
                item.qty += 1;
            } else {
                state.items.push({ ...book, qty: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(i => i._id !== action.payload);
        },
        removeAll(state) {
            state.items = []
        }
    }
});

export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
