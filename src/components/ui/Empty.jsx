import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  icon = 'Package',
  title = 'Nothing here yet',
  description = 'When you add items, they will appear here.',
  actionLabel,
  onAction,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {description}
        </p>
        
        {actionLabel && onAction && (
          <Button
            variant="primary"
            onClick={onAction}
            className="flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>{actionLabel}</span>
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty