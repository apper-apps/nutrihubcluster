import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const OrderSummary = ({ 
  items, 
  subtotal, 
  tax, 
  deliveryFee, 
  total, 
  onCheckout,
  loading = false,
  className = '' 
}) => {
  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
        Order Summary
      </h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-xl gradient-text">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Button
        variant="primary"
        size="large"
        onClick={onCheckout}
        disabled={loading || items.length === 0}
        className="w-full flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <ApperIcon name="Loader2" className="w-5 h-5" />
            </motion.div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <ApperIcon name="CreditCard" className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </>
        )}
      </Button>
    </Card>
  )
}

export default OrderSummary