function ValidCpf(cpf) {
    Object.defineProperty(this, 'clearCpf', {
        enumerable: true,
        get: function() {
            return cpf.replace(/\D+/g, '');
        }
    });
}

ValidCpf.prototype.valid = function() {
    if(typeof this.clearCpf === 'undefined') return false;
    if(this.clearCpf.length !== 11) return false;
    if(this.isS()) return false;

    const cpfP = this.clearCpf.slice(0, -2);
    const digit1 = this.createDigit(cpfP);
    const digit2 = this.createDigit(cpfP + digit1);
    const newCpf = cpfP + digit1 + digit2;

    return newCpf === this.clearCpf;
};

ValidCpf.prototype.createDigit = function(cpfP) {
    const cpfArray = Array.from(cpfP);
    let r = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (r * Number(val));
        r--;
        return ac;
    }, 0);

    const digit = 11 - (total % 11);
    return digit > 9 ? '0' : String(digit);
};

ValidCpf.prototype.isS = function() {
    const s = this.clearCpf[0].repeat(this.clearCpf.length);
    return s === this.clearCpf;
};

const cpf = new ValidCpf('705.484.450-52'); // 705.484.450-52
console.log(cpf.valid());

if(cpf.valida()) {
    console.log('Valid CPF');
} else {
    console.log('Invalid CPF');
}
