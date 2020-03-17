function eval() {
    // Do not use eval!!!
    return;
}
var numberStack = [];
var operatorsStack = [];
var elements = [];

function expressionCalculator(expr) {
  elements = parseExpression(expr);

  for(let i = 0; i < elements.length; i++){
    if(isNaN(elements[i])){
      switch(elements[i]) {
        case '(':
          operatorsStack.push(elements[i]);
          break;
        case ')':
          // TODO:
          break;
        default:
          calculateStack(i);
      }
    }else
       numberStack.push(parseFloat(elements[i]));
  }

  return calculateOperation();
}

function calculateStack(i){
  if(operatorsStack.length == 0 ||
      priority[elements[i]] > priority[operatorsStack[operatorsStack.length-1]]) {
    operatorsStack.push(elements[i])
  }
  else{
    if(operatorsStack.length > 1){
      numberStack.push(calculateOperation());
      operatorsStack.pop();
      calculateStack(i)
    } else throw "Error: Number of operators more than quantity of numbers!";
  }
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

module.exports = {
    expressionCalculator
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
