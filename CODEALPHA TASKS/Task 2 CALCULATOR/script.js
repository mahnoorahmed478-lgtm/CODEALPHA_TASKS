const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {

    const value = button.innerText;

    // Clear All
    if(value === 'AC'){
      expression = '';
      screen.value = '';
    }

    // Delete Single Digit
    else if(value === 'DEL'){
      expression = expression.slice(0, -1);
      screen.value = expression;
    }

    // Calculate
    else if(value === '='){
      try{
        expression = eval(expression).toString();
        screen.value = expression;
      }
      catch{
        screen.value = 'Error';
      }
    }

    // Normal Input
    else{
      expression += value;
      screen.value = expression;
    }

  });
});


// Keyboard Support

document.addEventListener('keydown', (e) => {

  const key = e.key;

  // Numbers & Operators
  if(!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)){
    expression += key;
    screen.value = expression;
  }

  // Enter = Calculate
  else if(key === 'Enter'){
    try{
      expression = eval(expression).toString();
      screen.value = expression;
    }
    catch{
      screen.value = 'Error';
    }
  }

  // Backspace = Delete One Digit
  else if(key === 'Backspace'){
    expression = expression.slice(0, -1);
    screen.value = expression;
  }

  // Escape = Clear All
  else if(key === 'Escape'){
    expression = '';
    screen.value = '';
  }

});