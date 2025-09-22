interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner = ({ size = 'md', color, className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div 
      className={`
        animate-spin rounded-full border-2 border-gray-300 border-t-current
        ${sizeClasses[size]}
        ${className}
      `}
      style={color ? { borderTopColor: color } : {}}
    />
  );
};

export default LoadingSpinner;