import { motion } from 'framer-motion'

const Loading = ({ className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-64 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-48 shimmer"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32 shimmer"></div>
      </div>
      
      {/* Filter skeleton */}
      <div className="flex space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-10 bg-gray-200 rounded-lg w-24 shimmer"></div>
        ))}
      </div>
      
      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="h-48 bg-gray-200 shimmer"></div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 shimmer"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-3 bg-gray-200 rounded w-16 shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-20 shimmer"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-16 shimmer"></div>
                <div className="h-8 bg-gray-200 rounded w-20 shimmer"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading