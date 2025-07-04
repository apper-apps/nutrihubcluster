import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { addToCart } from '@/store/cartSlice'

const ProductCard = ({ product, className = '' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(addToCart({ product, quantity: 1 }))
    toast.success(`${product.name} added to cart!`, {
      icon: <ApperIcon name="Check" className="w-5 h-5" />
    })
  }
  
  const handleCardClick = () => {
    navigate(`/product/${product.Id}`)
  }
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Meals': return 'primary'
      case 'Snacks': return 'accent'
      case 'Beverages': return 'secondary'
      default: return 'default'
    }
  }
  
  return (
    <Card 
      hover={true}
      onClick={handleCardClick}
      className={`overflow-hidden group ${className}`}
    >
      <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={getCategoryColor(product.category)}>
            {product.category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {product.nutrition?.calories && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <ApperIcon name="Flame" className="w-4 h-4" />
                <span>{product.nutrition.calories} cal</span>
              </div>
            )}
            {product.nutrition?.protein && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <ApperIcon name="Zap" className="w-4 h-4" />
                <span>{product.nutrition.protein}g protein</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">
              ${product.price}
            </span>
          </div>
          
          <Button 
            variant="primary" 
            size="small"
            onClick={handleAddToCart}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ProductCard