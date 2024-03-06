export function calculateTextWidth(text: string, fontSize: number, fontFamily: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
  
    context.font = `${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
  }
  