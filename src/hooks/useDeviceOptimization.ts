'use client';

import { useEffect, useState } from 'react';
import { getDeviceInfo, getOptimalTextColor, getTextRenderingClasses, DeviceInfo } from '@/lib/device-utils';

/**
 * Hook for device-specific optimizations
 */
export function useDeviceOptimization() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDeviceInfo(getDeviceInfo());
  }, []);

  const getOptimalColor = (baseColor: string) => {
    if (!deviceInfo) return baseColor;
    return getOptimalTextColor(baseColor, deviceInfo);
  };

  const getTextClasses = () => {
    if (!deviceInfo) return '';
    return getTextRenderingClasses(deviceInfo);
  };

  const applyTextStyles = (element: HTMLElement) => {
    if (!deviceInfo) return;
    // Import the function dynamically to avoid SSR issues
    import('@/lib/device-utils').then(({ applyDeviceTextStyles }) => {
      applyDeviceTextStyles(element, deviceInfo);
    });
  };

  return {
    deviceInfo,
    isClient,
    getOptimalColor,
    getTextClasses,
    applyTextStyles
  };
}

/**
 * Hook for text color optimization
 */
export function useOptimalTextColor(baseColor: string) {
  const { deviceInfo, isClient } = useDeviceOptimization();
  
  if (!isClient || !deviceInfo) {
    return baseColor;
  }
  
  return getOptimalTextColor(baseColor, deviceInfo);
}

