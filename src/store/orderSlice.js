import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true
      state.error = null
    },
    
    createOrderSuccess: (state, action) => {
      state.loading = false
      state.currentOrder = action.payload
      state.orders.push(action.payload)
    },
    
    createOrderError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    }
  }
})

export const { createOrderStart, createOrderSuccess, createOrderError, clearCurrentOrder } = orderSlice.actions
export default orderSlice.reducer