// npm install @tensorflow/tfjs
import * as tf from '@tensorflow/tfjs';
import './training-styles.css'
// npm install jquery
import $ from "jquery"

////////////////////////////////////////////
/// Data Of Training ///////////////////////
////////////////////////////////////////////

// datos para entrenar
//datos de entrada 
const datosEntra = [    [41, 157, 56],
                        [47, 157, 56],
                        [48, 157, 56],
                        [49, 157, 56],
                        [41, 170, 65],
                        [47, 170, 65],
                        [48, 170, 65],
                        [49, 170, 65],
                        [41, 183, 72],
                        [47, 183, 72],
                        [48, 183, 72],
                        [49, 183, 72]];

//Normalize the data
var x = [];

datosEntra.map((row) => (
    x.push([row[0]/200,row[1]/250,row[2]/250])
));

const inputTensor = tf.tensor(x, [x.length, 3]);

// console.log(datosEntrada)

// resultados esperados para cada dato de entrada
const datosEsp = [      ['S'],
                        ['M'],
                        ['L'],
                        ['XL'],
                        ['S'],
                        ['M'],
                        ['L'],
                        ['XL'],
                        ['S'],
                        ['M'],
                        ['L'],
                        ['XL']];

var y = [];

datosEsp.map((talla) => (
    y.push([(talla[0].charCodeAt(0))/100])
));

// [S,M,L,XL]
const categoricalY = [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1],
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1],
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1],
]

const outputTensor = tf.tensor(categoricalY, [categoricalY.length, 4]);

// console.log(datosEsperados)
const model = tf.sequential({
    layers: [
        tf.layers.dense({ inputShape: [3], units: 10, activation: 'relu' }),
        tf.layers.dense({ inputShape: [3], units: 100, activation: 'relu' }),
        tf.layers.dense({ inputShape: [3], units: 10, activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'softmax' }),
    ]
});

const learningRate = 0.001;

model.compile({
    optimizer: tf.train.adam(learningRate),
    loss: 'categoricalCrossentropy',      
    metrics: ['accuracy'],
});

async function learnSize() {
    $(".info-training").append("<div class='title'>Start Training: </div>");
    model.fit(inputTensor,outputTensor, {
        epochs: 1001,        
        shuffle: true,
        callbacks: {
            onEpochEnd: async (epoch, { loss }) => {
                if(epoch % 200 === 0){
                    $(".info-training").append("<div class='epoch'> epoch: "+ epoch + " loss: " + loss + "</div>");
                }
                await tf.nextFrame();
            }
        }
    }).then((info) => {   
        $(".info-training").append("<div  class='epoch title'>Final Accuracy: " + info.history.acc[info.history.acc.length-1]*100 + "%</div><br/>");
        model.save('localstorage://my-model-thm-size');
    });
}

////////////////////////////////////////////
/// End Data Of Training ///////////////////
////////////////////////////////////////////

function TrainingModel() {
    return (
        <div className="training-Model">
            <button className="training-model" onClick={learnSize}>
                Entrenar el Modelo
            </button>
            <div className='info-training'>

            </div>
        </div>
    );
}

export default TrainingModel;