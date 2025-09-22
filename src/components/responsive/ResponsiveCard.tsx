import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ResponsiveCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  compact?: boolean;
  icon?: ReactNode;
}

const ResponsiveCard = ({ 
  title, 
  description, 
  children, 
  className = "", 
  hoverable = false,
  compact = false,
  icon
}: ResponsiveCardProps) => {
  return (
    <Card 
      className={`
        ${hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''} 
        ${compact ? 'p-3 md:p-4' : ''} 
        ${className}
      `}
    >
      <CardHeader className={compact ? "pb-2 md:pb-3" : ""}>
        {icon && (
          <div className="flex items-center space-x-2 mb-2">
            {icon}
            <CardTitle className="text-sm md:text-base lg:text-lg">{title}</CardTitle>
          </div>
        )}
        {!icon && (
          <CardTitle className="text-sm md:text-base lg:text-lg">{title}</CardTitle>
        )}
        {description && (
          <CardDescription className="text-xs md:text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={compact ? "pt-0" : ""}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;