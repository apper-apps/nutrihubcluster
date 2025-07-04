import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { updateQuantity, removeFromCart } from '@/store/cartSlice'

const CartItem = ({ item, className = '' }) => {
  const dispatch = useDispatch()
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.productId))
      toast.info(`${item.product.name} removed from cart`)
    } else {
      dispatch(updateQuantity({ productId: item.productId, quantity: newQuantity }))
    }
  }
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.productId))
    toast.info(`${item.product.name} removed from cart`)
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center space-x-4 p-4 bg-white rounded-xl shadow-soft border border-gray-100 ${className}`}
    >
      <div className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
          {item.product.name}
        </h4>
        <p className="text-gray-600 text-xs line-clamp-1">
          {item.product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary">
            ${item.subtotal.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ApperIcon name="Minus" className="w-4 h-4 text-gray-600" />
            </button>
            <span className="w-8 text-center font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ApperIcon name="Plus" className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-error transition-colors"
      >
        <ApperIcon name="X" className="w-5 h-5" />
      </button>
    </motion.div>
  )
}

export default CartItem