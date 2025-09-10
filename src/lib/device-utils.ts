/**
 * Device-specific utilities for consistent text rendering across mobile devices
 */

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isSamsung: boolean;
  isHighDPI: boolean;
  hasPoorColorRendering: boolean;
  userAgent: string;
}

/**
 * Detect device capabilities and rendering issues
 */
export function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isSamsung: false,
      isHighDPI: false,
      hasPoorColorRendering: false,
      userAgent: ''
    };
  }

  const userAgent = window.navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isSamsung = /SamsungBrowser/.test(userAgent);
  const isHighDPI = window.devicePixelRatio >= 2;
  
  // Detect devices known to have poor color rendering
  const hasPoorColorRendering = isSamsung || 
    /Samsung|Galaxy|SM-/.test(userAgent) ||
    /OnePlus|OPPO|Vivo|Xiaomi|Redmi/.test(userAgent);

  return {
    isIOS,
    isAndroid,
    isSamsung,
    isHighDPI,
    hasPoorColorRendering,
    userAgent
  };
}

/**
 * Get appropriate text color based on device capabilities
 */
export function getOptimalTextColor(baseColor: string, deviceInfo: DeviceInfo): string {
  // For devices with poor color rendering, use pure black
  if (deviceInfo.hasPoorColorRendering) {
    return '#000000';
  }
  
  // For iOS devices, ensure darker colors
  if (deviceInfo.isIOS) {
    switch (baseColor) {
      case '#374151': return '#1a1a1a';
      case '#4b5563': return '#000000';
      case '#6b7280': return '#1a1a1a';
      default: return baseColor;
    }
  }
  
  // For Android devices, use slightly darker colors
  if (deviceInfo.isAndroid) {
    switch (baseColor) {
      case '#374151': return '#1f2937';
      case '#4b5563': return '#374151';
      case '#6b7280': return '#4b5563';
      default: return baseColor;
    }
  }
  
  return baseColor;
}

/**
 * Get CSS classes for optimal text rendering
 */
export function getTextRenderingClasses(deviceInfo: DeviceInfo): string {
  const classes = [];
  
  if (deviceInfo.hasPoorColorRendering) {
    classes.push('text-contrast-fallback');
  } else if (deviceInfo.isIOS || deviceInfo.isAndroid) {
    classes.push('text-dark-fallback');
  } else {
    classes.push('min-contrast-text');
  }
  
  return classes.join(' ');
}

/**
 * Apply device-specific text styles
 */
export function applyDeviceTextStyles(element: HTMLElement, deviceInfo: DeviceInfo): void {
  if (deviceInfo.hasPoorColorRendering) {
    element.style.color = '#000000';
    element.style.fontWeight = '600';
    element.style.textShadow = '0 0 0 #000000';
  } else if (deviceInfo.isIOS) {
    element.style.webkitTextFillColor = '#000000';
    element.style.color = '#000000';
  } else if (deviceInfo.isAndroid) {
    element.style.textShadow = '0 0 0 #1a1a1a';
    element.style.color = '#1a1a1a';
  }
}

