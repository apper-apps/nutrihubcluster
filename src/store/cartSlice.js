import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.productId === product.Id)
      
      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.subtotal = existingItem.quantity * product.price
      } else {
        state.items.push({
          productId: product.Id,
          product: product,
          quantity: quantity,
          subtotal: product.price * quantity
        })
      }
      
      state.total = state.items.reduce((sum, item) => sum + item.subtotal, 0)
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.productId !== productId)
      state.total = state.items.reduce((sum, item) => sum + item.subtotal, 0)
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.productId === productId)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.productId !== productId)
        } else {
          item.quantity = quantity
          item.subtotal = item.quantity * item.product.price
        }
        
        state.total = state.items.reduce((sum, item) => sum + item.subtotal, 0)
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer