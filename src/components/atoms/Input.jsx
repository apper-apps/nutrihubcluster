const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error = null,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          error 
            ? 'border-error focus:border-error' 
            : 'border-gray-200 focus:border-primary'
        } bg-white text-gray-900 placeholder-gray-500`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  )
}

export default Input