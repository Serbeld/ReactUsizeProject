import './files/styles-menu.css';
import './files/styles-product.css';
import {useState} from 'react';
import UsizeForm from '../UsizeForm';

function App() {

  const [clickToShow, setClickToShow] = useState(false);

  function onClickHide(){
    if (clickToShow === true){
      setClickToShow(false);
    }
    else{
      setClickToShow(true);
    }
  }  

  return (
    <div className="product">
      <div id="overlay" className={`ai-size ${clickToShow ? "show" : "hide"}`}>
        <div className="content">
          <span className="close-icon" onClick={onClickHide}>x</span>
          <div className="wrap-input">
            <UsizeForm/>
          </div>
        </div>
      </div>
      <button className='ia-size-button' onClick={onClickHide}>
        ¿Quieres conocer tu talla? <span className='beta'> (BETA) </span>
      </button>
      
    </div>
  );
}

export default App;
