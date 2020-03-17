function eval() {
    // Do not use eval!!!
    return;
}
var numberStack = [];
var operatorsStack = [];
var elements = [];

function expressionCalculator(expr) {
  clearStacks();
  elements = parseExpression(expr);

  for(let i = 0; i < elements.length; i++){
    if(isNaN(elements[i])){
      switch(elements[i]) {
        case '(':
          operatorsStack.push(elements[i]);
          break;
        case ')':
          calculateBracketsExpression(i);
          break;
        default:
          calculateStack(i);
      }
    }else
       numberStack.push(parseFloat(elements[i]));
  }

  while(numberStack.length > 1){
    calculateSimpleExpression();
  }

  if(operatorsStack.length > 0)
    throw "ExpressionError: Brackets must be paired"

  return numberStack[0];
}

function calculateStack(i){
  if(operatorsStack.length == 0 || operatorsStack[operatorsStack.length-1] == '(' ||
      priority[elements[i]] > priority[operatorsStack[operatorsStack.length-1]]) {
    operatorsStack.push(elements[i]);
  }
  else{
    if(operatorsStack.length > 0){
      calculateSimpleExpression();
      calculateStack(i);
    } else throw "Error: Number of operators more than quantity of numbers!";
  }
}

function calculateBracketsExpression(i){
  let count = operatorsStack.length - 1;
  while(true){
    if(count < 0) {
      throw "ExpressionError: Brackets must be paired"
    }else {
      if(operatorsStack[count] == '('){
        operatorsStack.pop();
        break;
      }else{
        calculateSimpleExpression();
      }
    }
    count--;
  }

}

function calculateSimpleExpression(){
  let temp = calculateOperation();
  if (temp == Infinity || temp== -Infinity) throw "TypeError: Division by zero.";
  numberStack.push(temp);
  operatorsStack.pop();
}

function calculateOperation(){
  let [y, x] = [numberStack.pop(), numberStack.pop()];
  return operators[operatorsStack[operatorsStack.length-1]](x, y);
}

function parseExpression(str){
  return str.replace( /\s/g, '' )
            .replace( /\-/g, " - " )
            .replace( /\+/g, " + " )
            .replace( /\*/g, " * " )
            .replace( /\//g, " / " )
            .replace( /\(/g, " ( " )
            .replace( /\)/g, " ) " )
            .trim()
            .replace( /\s\s/g, " " )
            .split(' ');
}

function clearStacks(){
  numberStack = [];
  operatorsStack = [];
  elements = [];
}

const priority = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '(': 3
};

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y
};

module.exports = {
    expressionCalculator
}
