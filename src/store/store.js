import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/store/cartSlice'
import orderReducer from '@/store/orderSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
})