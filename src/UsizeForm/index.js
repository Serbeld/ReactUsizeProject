// npm install @tensorflow/tfjs
// import * as tf from '@tensorflow/tfjs';

// var i = 0;

// async function TestSize() {
//     const inputData = tf.tensor2d([43,174,70], [1, 3]);
//     const val = model(inputData);
//     const myVal = await val.data()
//     console.log(myVal)

//     document.getElementById('divPrueba').innerHTML = '<div class="talla-ideal"><div class="talla-ideal-text">Tu talla ideal es:</div><div id="talla-ideal"></div></div>'
// }

function UsizeForm() {
    return (
        <div className="React-Form">

            <form className="form">

                <div className="form__section">
                    <input type="espalda" className="form__input" placeholder="Ancho de espalda" required />
                    <span>cm</span>
                </div>

                <div className="form__section">
                    <input type="altura" className="form__input" placeholder="Altura" required />
                    <span>cm</span>
                </div>

                <div className="form__section">
                    <input type="peso" className="form__input" placeholder="Peso" required />
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
}

export default UsizeForm;
