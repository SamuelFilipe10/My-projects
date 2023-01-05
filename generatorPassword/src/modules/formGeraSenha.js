import geraSenha from "./geradores";

const senhaGerada = document.querySelector('.senha-gerada');
const qtdCracteres = document.querySelector('.qtd-caracteres');
const checkMaiusculas = document.querySelector('.chk-maiusculuas');
const checkMinusculas = document.querySelector('.chk-minusculas');
const checkNumeros = document.querySelector('.chk-numeros');
const checkSimbolos = document.querySelector('.chk-simbolos');
const button = document.querySelector('.gerar-senha');

export default () => {
    button.addEventListener('click', () => {
        senhaGerada.innerHTML = gera();
    });
};

function gera() {
    const senha = geraSenha(
        qtdCracteres.value,
        checkMaiusculas.checked,
        checkMinusculas.checked,
        checkNumeros.checked,
        checkSimbolos
    );

    return senha || 'Nada selecionado.';
}
