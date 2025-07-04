import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error while loading your content. Please try again.',
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" className="w-10 h-10 text-error" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            className="flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default Error