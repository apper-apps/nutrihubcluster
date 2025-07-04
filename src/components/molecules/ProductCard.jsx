import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import React from "react";
import { addToCart } from "@/store/cartSlice";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

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
    className={`overflow-hidden group ${className}`}>
    <div
        className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50 relative">
        <img
            src={product?.image}
            alt={product?.name || "Product image"}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
            }}
            onLoad={e => {
                e.target.style.opacity = "1";

                if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = "none";
                }
            }}
            style={{
                opacity: 0
            }} />
        <div
            className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
            style={{
                display: "none"
            }}>
            <div className="text-center">
                <ApperIcon name="ImageOff" size={32} className="text-gray-400 mx-auto mb-1" />
                <p className="text-gray-500 text-xs">No image</p>
            </div>
        </div>
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
            <Badge variant={getCategoryColor(product.category)} className="ml-2">
                {product.category}
            </Badge>
        </div>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                {product.nutrition?.calories && <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <ApperIcon name="Flame" className="w-4 h-4" />
                    <span>{product.nutrition.calories}cal</span>
                </div>}
                {product.nutrition?.protein && <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <ApperIcon name="Zap" className="w-4 h-4" />
                    <span>{product.nutrition.protein}g protein</span>
                </div>}
            </div>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold gradient-text">${product.price}</span>
            </div>
            <Button
                variant="primary"
                size="small"
                onClick={handleAddToCart}
                className="flex items-center space-x-2">
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Add</span>
            </Button>
        </div>
    </div>
</Card>
  )
}

export default ProductCard