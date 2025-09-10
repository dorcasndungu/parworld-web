'use client';

import { useOptimalTextColor } from '@/hooks/useDeviceOptimization';
import { ReactNode } from 'react';

interface OptimizedTextProps {
  children: ReactNode;
  baseColor: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component that automatically optimizes text color based on device capabilities
 */
export default function OptimizedText({ 
  children, 
  baseColor, 
  className = '', 
  style = {},
  as: Component = 'span'
}: OptimizedTextProps) {
  const optimalColor = useOptimalTextColor(baseColor);
  
  return (
    <Component 
      className={className}
      style={{ 
        color: optimalColor,
        ...style 
      }}
    >
      {children}
    </Component>
  );
}

/**
 * Pre-configured text components for common use cases
 */
export const DarkText = ({ children, className = '', ...props }: Omit<OptimizedTextProps, 'baseColor'>) => (
  <OptimizedText baseColor="#374151" className={className} {...props}>
    {children}
  </OptimizedText>
);

export const MediumText = ({ children, className = '', ...props }: Omit<OptimizedTextProps, 'baseColor'>) => (
  <OptimizedText baseColor="#4b5563" className={className} {...props}>
    {children}
  </OptimizedText>
);

export const LightText = ({ children, className = '', ...props }: Omit<OptimizedTextProps, 'baseColor'>) => (
  <OptimizedText baseColor="#6b7280" className={className} {...props}>
    {children}
  </OptimizedText>
);

export const GreenText = ({ children, className = '', ...props }: Omit<OptimizedTextProps, 'baseColor'>) => (
  <OptimizedText baseColor="#004225" className={className} {...props}>
    {children}
  </OptimizedText>
);

