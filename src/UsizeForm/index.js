function UsizeForm() {
    return (
        <div className="React-Form">

            <form class="form">

                <div class="form__section">
                    <input type="espalda" class="form__input" placeholder="Ancho de espalda" required />
                    <span>cm</span>
                </div>

                <div class="form__section">
                    <input type="altura" class="form__input" placeholder="Altura" required />
                    <span>cm</span>
                </div>

                <div class="form__section">
                    <input type="peso" class="form__input" placeholder="Peso" required />
                    <span>kg</span>
                </div>

                <br />

                <div class="form__section">
                    <button type="submit" class="form__input" >
                        Predecir mi talla
                    </button>
                </div>

            </form>
        </div>
    );
}

export default UsizeForm;
