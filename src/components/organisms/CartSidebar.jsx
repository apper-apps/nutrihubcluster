import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import CartItem from '@/components/molecules/CartItem'
import ApperIcon from '@/components/ApperIcon'
import Empty from '@/components/ui/Empty'

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { items, total, itemCount } = useSelector(state => state.cart)
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.warning('Your cart is empty!')
      return
    }
    navigate('/checkout')
    onClose()
  }
  
  const deliveryFee = 5.99
  const tax = total * 0.08
  const finalTotal = total + deliveryFee + tax
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-display font-semibold text-gray-900">
                Your Cart ({itemCount})
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="X" className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-6">
                  <Empty
                    icon="ShoppingCart"
                    title="Your cart is empty"
                    description="Add some healthy items to get started!"
                    actionLabel="Browse Products"
                    onAction={() => {
                      navigate('/')
                      onClose()
                    }}
                  />
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-xl gradient-text">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="CreditCard" className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar