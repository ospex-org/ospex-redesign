export const adjustBrightness = (color: string, factor: number): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${factor})`;
  }
  
  // Handle rgba colors
  if (color.startsWith('rgba')) {
    const matches = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (matches) {
      const [_, r, g, b] = matches;
      return `rgba(${r}, ${g}, ${b}, ${factor})`;
    }
  }
  
  return color;
}; 