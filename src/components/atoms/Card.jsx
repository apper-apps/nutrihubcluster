import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  hover = false, 
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = "bg-white rounded-2xl shadow-soft border border-gray-100"
  const hoverClasses = hover ? "card-hover cursor-pointer" : ""
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card