function createCalculator() {
    return {
        display: document.querySelector('.display'),

        start() {
            this.clickButtons();
            this.clearDisplay();
            this. pressEnter();
        },

        pressEnter() {
            this.display.addEventListener('keyup', e => {
                if(e.keyCode === 13) {
                    this.equals();
                }
            })
        },

        equals() {
            let count = this.display.value;

            try {
                count = eval(count);

                if(!count) {
                    alert('Invalid count');
                    return;
                }

                this.display.value = String(count);

            } catch(e) {
                alert('Invalid count');
                return;
            }
        },

        clearDisplay() {
            this.display.value = '';
        },

        deleteOne() {
            this.display.value =  this.display.value.slice(0, -1);

        },


        clickButtons() {
            // this -> calculator
            document.addEventListener('click', function(e) {
                const el = e.target;

                if(el.classList.contains('btn-num')) {
                    this.btnToDisplay(el.innerText);
                }

                if(el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }

                if(el.classList.contains('btn-del')) {
                    this.deleteOne();
                }

                if(el.classList.contains('btn-eq')) {
                    this.equals();
                }

            }.bind(this));
        },

        btnToDisplay(value) {
            this.display.value += value;
        }
    };
}

const calculator = createCalculator();
calculator.start();