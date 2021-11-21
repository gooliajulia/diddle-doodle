
import './App.css';
import DrawingPad from './components/DrawingPad.js'
import ColorButton from './components/ColorButton.js'

function App() {

  const colors = ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#bb3e03', '#ae2012', '#9b2226' ]


  return (
    <div className="App">
      <h1>doodle.</h1>
      <div className='drawing-section'>
        <div className='color-buttons'>
        <ColorButton color={colors[0]} />
        <ColorButton color={colors[1]} />
        <ColorButton color={colors[2]} />
        <ColorButton color={colors[3]} />
        <ColorButton color={colors[4]} />
        <ColorButton color={colors[5]} />
        <ColorButton color={colors[6]} />
        <ColorButton color={colors[7]} />
        <ColorButton color={colors[8]} />
        </div>
        <DrawingPad />
      </div>
    </div>
  );
}

export default App;
