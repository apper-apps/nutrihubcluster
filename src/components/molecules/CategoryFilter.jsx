import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, className = '' }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All Items': return 'Grid3x3'
      case 'Meals': return 'UtensilsCrossed'
      case 'Snacks': return 'Cookie'
      case 'Beverages': return 'Coffee'
      default: return 'Circle'
    }
  }
  
  return (
    <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={activeCategory === category ? 'primary' : 'ghost'}
            size="medium"
            onClick={() => onCategoryChange(category)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <ApperIcon name={getCategoryIcon(category)} className="w-4 h-4" />
            <span>{category}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryFilter