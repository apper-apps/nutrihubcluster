import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/organisms/ProductGrid'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { productService } from '@/services/api/productService'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [searchTerm, setSearchTerm] = useState('')
  
  const categories = ['All Items', 'Meals', 'Snacks', 'Beverages']
  
  useEffect(() => {
    loadProducts()
  }, [])
  
  useEffect(() => {
    // Handle URL category parameter
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [searchParams])
  
  useEffect(() => {
    filterProducts()
  }, [products, activeCategory, searchTerm])
  
  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const filterProducts = () => {
    let filtered = products
    
    // Filter by category
    if (activeCategory !== 'All Items') {
      filtered = filtered.filter(product => product.category === activeCategory)
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredProducts(filtered)
  }
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    // Update URL
    if (category === 'All Items') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }
  
  const handleSearch = (term) => {
    setSearchTerm(term)
  }
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Failed to load products"
          message={error}
          onRetry={loadProducts}
        />
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
          Healthy Food, <span className="gradient-text">Delivered Fresh</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our curated selection of nutritious meals, snacks, and beverages 
          designed to fuel your healthy lifestyle.
        </p>
      </motion.div>
      
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-6"
      >
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search for healthy foods..."
          className="max-w-lg mx-auto"
        />
        
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          className="justify-center"
        />
      </motion.div>
      
      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
          {activeCategory !== 'All Items' && ` in ${activeCategory}`}
        </p>
      </motion.div>
      
      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ProductGrid products={filteredProducts} />
      </motion.div>
    </div>
  )
}

export default Home