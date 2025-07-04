import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Empty from '@/components/ui/Empty'

const ProductGrid = ({ products, loading = false, className = '' }) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-soft p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  if (products.length === 0) {
    return (
      <div className="col-span-full">
        <Empty
          icon="Search"
          title="No products found"
          description="Try adjusting your search or category filter"
          actionLabel="Clear Filters"
          onAction={() => window.location.reload()}
        />
      </div>
    )
  }
  
  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={product.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProductGrid