import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { productService } from '@/services/api/productService'
import { addToCart } from '@/store/cartSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    loadProduct()
  }, [id])
  
  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getById(parseInt(id))
      setProduct(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }))
    toast.success(`${product.name} added to cart!`, {
      icon: <ApperIcon name="Check" className="w-5 h-5" />
    })
  }
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Meals': return 'primary'
      case 'Snacks': return 'accent'
      case 'Beverages': return 'secondary'
      default: return 'default'
    }
  }
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-2xl shimmer"></div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 shimmer"></div>
            <div className="h-12 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Product not found"
          message={error}
          onRetry={loadProduct}
        />
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Product not found"
          message="The product you're looking for doesn't exist."
          onRetry={() => navigate('/')}
        />
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
<motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-square rounded-2xl overflow-hidden shadow-soft bg-gray-100">
            <img
              src={product?.image}
              alt={product?.name || 'Product image'}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'none';
                }
              }}
              style={{ opacity: 0 }}
            />
            <div 
              className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
              style={{ display: 'none' }}
            >
              <div className="text-center">
                <ApperIcon name="ImageOff" size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Image not available</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <Badge variant={getCategoryColor(product.category)} className="mb-4">
              {product.category}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold gradient-text">
              ${product.price}
            </span>
          </div>
          
          {/* Nutrition Info */}
          {product.nutrition && (
            <Card className="p-6">
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                Nutrition Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ApperIcon 
                        name={key === 'calories' ? 'Flame' : key === 'protein' ? 'Zap' : 'Circle'} 
                        className="w-5 h-5 text-primary" 
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{key}</p>
                      <p className="text-gray-600">{value}{key === 'calories' ? '' : 'g'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Ingredients */}
          {product.ingredients && (
            <Card className="p-6">
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </Card>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ApperIcon name="Minus" className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ApperIcon name="Plus" className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="large"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="ShoppingCart" className="w-5 h-5" />
              <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail