import { calculateTextWidth } from "./calculateWidth";


interface AppProps {
    text: string;
  }

const WidthCalculator: React.FC<AppProps> = ({text}) => {
  const fontSize = 12;
  const fontFamily = 'Arial';
  const textWidth = calculateTextWidth(text, fontSize, fontFamily);

  return <p>Width of text "{text}": {textWidth}px</p>;
};

export default WidthCalculator;
