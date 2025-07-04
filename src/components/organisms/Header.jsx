import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import CartSidebar from '@/components/organisms/CartSidebar'

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { itemCount } = useSelector(state => state.cart)
  
  const navigation = [
    { name: 'All Items', href: '/' },
    { name: 'Meals', href: '/?category=Meals' },
    { name: 'Snacks', href: '/?category=Snacks' },
    { name: 'Beverages', href: '/?category=Beverages' },
  ]
  
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <ApperIcon name="Leaf" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold gradient-text">
                NutriHub
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            
            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="medium"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ApperIcon name="ShoppingCart" className="w-6 h-6" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="medium"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header