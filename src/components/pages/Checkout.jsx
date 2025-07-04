import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'
import CartItem from '@/components/molecules/CartItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { orderService } from '@/services/api/orderService'
import { clearCart } from '@/store/cartSlice'
import { createOrderStart, createOrderSuccess, createOrderError } from '@/store/orderSlice'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, total } = useSelector(state => state.cart)
  const { loading } = useSelector(state => state.order)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  
  const [errors, setErrors] = useState({})
  
  const deliveryFee = 5.99
  const tax = total * 0.08
  const finalTotal = total + deliveryFee + tax
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required'
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    
    try {
      dispatch(createOrderStart())
      
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          product: item.product,
          quantity: item.quantity,
          subtotal: item.subtotal
        })),
        deliveryInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentInfo: {
          method: formData.paymentMethod,
          ...(formData.paymentMethod === 'card' && {
            cardNumber: formData.cardNumber.slice(-4),
          })
        },
        subtotal: total,
        tax: tax,
        deliveryFee: deliveryFee,
        total: finalTotal,
        status: 'confirmed'
      }
      
      const order = await orderService.create(orderData)
      dispatch(createOrderSuccess(order))
      dispatch(clearCart())
      
      toast.success('Order placed successfully!')
      navigate(`/order-confirmation/${order.Id}`)
      
    } catch (error) {
      dispatch(createOrderError(error.message))
      toast.error('Failed to place order. Please try again.')
    }
  }
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty
          icon="ShoppingCart"
          title="Your cart is empty"
          description="Add some items to your cart before checking out"
          actionLabel="Browse Products"
          onAction={() => navigate('/')}
        />
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Checkout
        </h1>
        <p className="text-gray-600">
          Complete your order and get your healthy food delivered
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Delivery Information */}
            <Card className="p-6">
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                />
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={errors.address}
                  required
                />
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={errors.city}
                  required
                />
                <Input
                  label="Zip Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  error={errors.zipCode}
                  required
                />
              </div>
            </Card>
            
            {/* Payment Information */}
            <Card className="p-6">
              <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
                Payment Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="CreditCard" className="w-6 h-6 text-primary" />
                        <span className="font-medium">Credit Card</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'cash')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === 'cash'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Banknote" className="w-6 h-6 text-primary" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Input
                        label="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        error={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <Input
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      error={errors.cvv}
                      placeholder="123"
                      required
                    />
                  </div>
                )}
              </div>
            </Card>
          </form>
        </motion.div>
        
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({items.length} items)</span>
                <span className="font-medium">${total.toFixed(2)}</span>
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
                  <span className="font-bold text-xl gradient-text">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
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
                  <ApperIcon name="Lock" className="w-5 h-5" />
                  <span>Place Order</span>
                </>
              )}
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout