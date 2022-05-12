
import './App.css';
import Grid from './components/Grid';
import Header from './components/Header';

import {useState} from 'react'

function App() {
  const [countMoves, setCountMoves] = useState(0)
  const [countFalse, setCountFalse] = useState(0)
  const [restart, setRestart] = useState(false)

 
  return (
    <div className='container'>
      <div>
        <Header />
        
      </div>
      <Grid counter={setCountMoves}
            counterFalse={setCountFalse}/>
    </div>
  );
}

export default App;
