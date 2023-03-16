function Game() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const result = document.querySelector('.result');
      const user = document.querySelector('.option');
      const randomOption = getRandomOption();
  
      function getRandomOption() {
        const options = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
      }
  
      if (user.value === '1' && randomOption === 'Rock') {
        result.innerHTML = 'A tie';
      } else if (user.value === '2' && randomOption === 'Paper') {
        result.innerHTML = 'A tie';
      } else if (user.value === '3' && randomOption === 'Scissors') {
        result.innerHTML = 'A tie';
      } else if (user.value === '1' && randomOption === 'Paper') {
        result.innerHTML = 'You lose';
      } else if (user.value === '2' && randomOption === 'Rock') {
        result.innerHTML = 'You lose';
      } else if (user.value === '3' && randomOption === 'Paper') {
        result.innerHTML = 'You lose';
      } else if (user.value === '1' && randomOption === 'Scissors') {
        result.innerHTML = 'You won';
      } else if (user.value === '2' && randomOption === 'Scissors') {
        result.innerHTML = 'You won';
      } else if (user.value === '3' && randomOption === 'Rock') {
        result.innerHTML = 'You won';
      }
    });
  }
  
  Game();