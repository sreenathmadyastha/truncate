
import { useState } from 'react';
import './App.css';
import TruncateString from './library/TruncateTx';
import WidthCalculator from './service/textWidth';

function App() {
  const [text, setText] = useState<string>('');

  return (

    <div className="App" >
      <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <TruncateString text={text} maxWidth={500} minWidth={20} ellipsisPosition={'middle'} />
        <WidthCalculator text={text}  />
      </div>
    </div>
  );
}

export default App;
