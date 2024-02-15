
import './App.css';
import TruncateString from './library/TruncateTx';

function App() {
  return (
    
        <div>
      <TruncateString text="Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit. n React, you can achieve truncating a string when it reaches a certain pixel size by measuring the width of the rendered text and comparing it to the desired width. You can use a ref to access the DOM element containing the text and then measure its width using getBoundingClientRect(). Here's a basic example of how you could implement this" 
      maxWidth={500} minWidth={20} ellipsisPosition={'middle'} />
    
    </div>
  );
}

export default App;
