import React, { useRef, useEffect, useState } from 'react';

interface TruncateStringProps {
  text: string;
  maxWidth: number;
  minWidth: number;
  ellipsisPosition: 'beginning' | 'middle' | 'end';
}

const TruncateString: React.FC<TruncateStringProps> = ({
  text,
  maxWidth,
  minWidth,
  ellipsisPosition,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [truncatedText, setTruncatedText] = useState<string>(text);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const checkWidth = () => {
      if (ref.current) {
        const { width } = ref.current.getBoundingClientRect();

        const measureTextWidth = (text: string) => {
          if (context) {
            context.font = window.getComputedStyle(ref.current!).font!;
            return context.measureText(text).width;
          }
          return 0;
        };

        if (width > maxWidth) {
          let truncated = text;
          if (ellipsisPosition === 'end') {
            let truncatedLength = text.length;
            let ellipsisWidth = measureTextWidth('...');
            while (measureTextWidth(truncated) + ellipsisWidth > maxWidth) {
              truncatedLength--;
              truncated = text.slice(0, truncatedLength);
            }
            truncated += '...';
          } else if (ellipsisPosition === 'beginning') {
            let truncatedLength = text.length;
            // let ellipsisWidth = measureTextWidth('...');
            while (measureTextWidth('...' + truncated) > maxWidth) {
              truncatedLength--;
              truncated = text.slice(text.length - truncatedLength);
            }
            truncated = '...' + truncated;
          } else if (ellipsisPosition === 'middle') {
            const halfLength = Math.floor(text.length / 2);
            let firstHalf = text.slice(0, halfLength);
            let secondHalf = text.slice(-halfLength);
            // let ellipsisWidth = measureTextWidth('...');
            while (measureTextWidth(firstHalf + '...' + secondHalf) > maxWidth) {
              firstHalf = firstHalf.slice(0, -1);
              secondHalf = secondHalf.slice(1);
            }
            truncated = firstHalf + '...' + secondHalf;
          }
          setTruncatedText(truncated);
        } else if (width < minWidth) {
          // If container width is less than minWidth, set text as original text
          setTruncatedText(text);
        }
      }
    };

    checkWidth();

    // Add event listener for window resize
    window.addEventListener('resize', checkWidth);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, [text, maxWidth, minWidth, ellipsisPosition]);

  return (
    <div ref={ref} style={{ minWidth: `${minWidth}px`, whiteSpace: 'nowrap' }}>
      {truncatedText}
    </div>
  );
};

export default TruncateString;
