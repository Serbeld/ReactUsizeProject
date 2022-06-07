// npm install @tensorflow/tfjs
import * as tf from '@tensorflow/tfjs';
import React, { useState } from 'react';
import svg from './up-arrow.min.svg';
import './UsizeForm.css'

var talla = "S";

async function predict(event, setRenderForm) {
    event.preventDefault();
    try {
        let model = await tf.loadLayersModel('localstorage://my-model-thm-size');
        let espalda = event.target.elements["espalda"].value
        let altura = event.target.elements["altura"].value
        let peso = event.target.elements["peso"].value

        let predictions = (model.predict(tf.tensor([espalda / 200, altura / 250, peso / 250], [1, 3])));

        let prediction = [];
        predictions.dataSync().forEach(predictedValue => prediction.push(Math.round(predictedValue * 100) / 100));

        const max = Math.max(...prediction);

        switch (prediction.indexOf(max)) {
            case 0:
                talla = "S"
                setRenderForm(false);
                break;
            case 1:
                talla = "M"
                setRenderForm(false);
                break;
            case 2:
                talla = "L"
                setRenderForm(false);
                break;
            case 3:
                talla = "XL"
                setRenderForm(false);
                break;
            default:
                break;
        }

    } catch (error) {
        console.log(error.message)
    }
}

function ShowTalla({setRender}) {

    return (
        <div className='show-talla-predicted'>
            <div className='info-talla-predicted'>
                <div className='title-sugestion'>Tu talla sugerida es:</div>
                <div class="talla-predicted-text-container"> 
                    <div className='talla-predicted-text'>
                        {talla} 
                    </div>
                </div>
                <div class="predicted-bar-container">
                    <span class="left-title">
                        Ajustado
                    </span>
                    <span class="middle-title">A medida</span>
                    <span class="right-title">
                        Holgado
                    </span>
                    <div class="talla-predicted-result-line">
                        <img class="talla-predicted-result-marker" src={svg} alt="arrow" width="16px" height="16px" />
                        <div class="talla-predicted-result-red talla-predicted-result-left"></div>
                        <div class="talla-predicted-result-green"></div>
                        <div class="talla-predicted-result-red talla-predicted-result-right"></div>
                    </div>
                </div>
            </div>
            <div className='come-back'>
                <button className='come-back-button' onClick={() => {setRender()}}>
                    Volver atras
                </button>
            </div>
        </div>
    );
}

function UsizeForm() {

    const [renderForm, setRenderForm] = useState(true);

    const setTrue = () => {
        setRenderForm(true);
    };
    
    if (renderForm === true) {
        return (
            <div className="React-Form">
                <form className="form" onSubmit={(event) => { predict(event, setRenderForm) }} >
                    <div className="form__section">
                        <input type="number" name="espalda" className="form__input espalda" placeholder="Ancho de espalda" required />
                        <span>cm</span>
                    </div>
                    <div className="form__section">
                        <input type="number" name="altura" className="form__input altura" placeholder="Altura" required />
                        <span>cm</span>
                    </div>
                    <div className="form__section">
                        <input type="number" name="peso" className="form__input peso" placeholder="Peso" required />
                        <span>kg</span>
                    </div>
                    <br />
                    <div className="form__section">
                        <button type="submit" className="form__input" >
                            Predecir mi talla
                        </button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div className="React-Form">
                <ShowTalla setRender={setTrue} />
            </div>
        );
    }
}

export default UsizeForm;
