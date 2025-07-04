import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { orderService } from '@/services/api/orderService'
import { clearCurrentOrder } from '@/store/orderSlice'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    loadOrder()
    return () => {
      dispatch(clearCurrentOrder())
    }
  }, [orderId, dispatch])
  
  const loadOrder = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await orderService.getById(parseInt(orderId))
      setOrder(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Order not found"
          message={error}
          onRetry={() => navigate('/')}
        />
      </div>
    )
  }
  
  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Order not found"
          message="The order you're looking for doesn't exist."
          onRetry={() => navigate('/')}
        />
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckCircle" className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 text-lg">
          Thank you for your order. We'll start preparing your healthy food right away.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Order Details
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-medium">#{order.Id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <Badge variant="success">{order.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">{order.paymentInfo.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">30-45 minutes</span>
              </div>
            </div>
            
            <div className="space-y-3 pt-6 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl gradient-text">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Delivery Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="font-medium">{order.deliveryInfo.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="font-medium">{order.deliveryInfo.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="font-medium">{order.deliveryInfo.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="font-medium">
                  {order.deliveryInfo.address}<br />
                  {order.deliveryInfo.city}, {order.deliveryInfo.zipCode}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Order Items
          </h2>
          
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm">{item.product.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    <span className="font-medium text-primary">${item.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          variant="primary"
          onClick={() => navigate('/')}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          <span>Continue Shopping</span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.print()}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Printer" className="w-5 h-5" />
          <span>Print Receipt</span>
        </Button>
      </motion.div>
    </div>
  )
}

export default OrderConfirmation