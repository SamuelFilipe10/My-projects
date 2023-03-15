function Form() {
    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.querySelector('.name');
        const lastName = document.querySelector('.last-name');
        const age = document.querySelector('.age');
        const result = document.querySelector('.result');

        result.innerHTML = `${name.value}, ${lastName.value}, ${Number(age.value)}`;

        if (name.value === '' && lastName.value === '' && age.value === '') {
            result.innerHTML = 'Type a value';
        }        
    });
}

Form();
