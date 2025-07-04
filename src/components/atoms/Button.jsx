import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/20 focus:ring-primary",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary",
    accent: "bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent/20 focus:ring-accent",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary focus:ring-primary",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
  }
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  }
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button