function projectImc() {
    const form = document.querySelector('form');
    const h2 = document.querySelector('h2');

    function calculateIMC(e) {
        e.preventDefault();

        const weight = document.querySelector('.weight');
        const height = document.querySelector('.height');

        const toCalculeImc = (Number(weight.value)) / (Number(height.value) ** 2);

        // h2.innerHTML = `Your bmi's ${toCalculeImc.toFixed(2)}`;

        if (toCalculeImc < 18.5) {
            h2.innerHTML = `Your bmi's ${toCalculeImc.toFixed(2)}</br>under weight`;
        } else if (toCalculeImc >= 18.6 && toCalculeImc <= 24.9 ) {
            h2.innerHTML = `Your bmi's ${toCalculeImc.toFixed(2)}</br>ideal weight`;
        } else if (toCalculeImc >= 25.0 && toCalculeImc <= 29.9 ) {
            h2.innerHTML = `Your bmi's ${toCalculeImc.toFixed(2)}</br>Grade 1 obesityt`
        } else if (toCalculeImc >= 30.0 && toCalculeImc <= 34.9 ) {
            h2.innerHTML = `Your bmi's ${toCalculeImc.toFixed(2)}</br>Grade 2 obesityt`
        } else if (toCalculeImc >= 40.0) {
            h2.innerHTML = `Your bmi's ${toCalculeImc.toFixed(2)}</br>Grade 3 obesityt`
        }     
    }

    form.addEventListener('submit', calculateIMC);
}

projectImc();