const extend = document.querySelector('#extend');
const switcher = document.querySelector('.switch');
const wrapper = document.querySelector('.wrapper');
const tablo = document.querySelector('.tablo');
const pad = document.querySelector('.pad');
const extraFunc = document.querySelector('#extra-func');
const history = document.querySelector('.history');

const btns = {
    'clear': 'c', 'plus': '+', 'minus': '-', 'multy': '*', 'subdiv': '/', 'percent': '%', 'dot': '.', 'res': '=', 'Enter': '='
  }

const opers = ['-', '+', '/', '*']

let str; 
let oper;
let operands = [];
let newOperand;
let extended = false;
let toggle = false;

const initialize = () => {
  str = '0';
  oper = '';
  operands = [];
  newOperand = false;
}

const factorial = n => {
  if (n < 0) return 0
  if (n === 0) return 1;
  return factorial(n - 1) * n;
}

const switchIt = () => {
  if (!toggle) {
    switcher.classList.remove('on');
    switcher.classList.add('off');
    initialize();
  } else {
    switcher.classList.remove('off');
    switcher.classList.add('on');
    str = ''
  }
  tablo.textContent = str;
  toggle = toggle ? false : true;
}

const shift = e => {
  extended = extended ? false : true
  if (!extended) {
    wrapper.classList.remove('extra');
    tablo.classList.remove('extra-size');
    pad.classList.remove('extra-size');
    extraFunc.classList.add('hidden');
  } else {
    wrapper.classList.add('extra');
    tablo.classList.add('extra-size');
    pad.classList.add('extra-size');
    extraFunc.classList.remove('hidden');
  }
}

const result = () => {
  operands[1] = Number(str);
  if (oper === '+') str =  String(operands[0] + operands[1]);
  if (oper === '-') str =  String(operands[0] - operands[1]);
  if (oper === '*') str =  String(operands[0] * operands[1]);
  if (oper === '/') str =  String(operands[0] / operands[1]);
  if (oper === 'mod') str =  String(operands[0] % operands[1]);
  
  if (str.length > 12) str = str.substring(0, 12);
  tablo.textContent = str;
  operands[0] = Number(str);
}

const btnPressed = e => {
  pressed(btns[e.target.id] || e.target.id);
}

const keyPressed = e => {
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'c', '+', '-', '*', '/', '%', '.', 'Enter'].includes(e.key)) {
    pressed(btns[e.key] || e.key);    
  } 
}

const wtiteHistory = c => {
  history.textContent += c;
}

const pressed = c => {
  if (!toggle) return;
  wtiteHistory(c);

  let ch = '';
  switch (c.toLowerCase()) {
    case 'c':
      initialize();
      break;
    case 'plus-minus':
      str = str[0] === '-' ? str.slice(1) : `${'-'}${str}`;
      break;
    case '%':
      str = operands[0] === undefined ? 0 : String(operands[0] * Number(str) / 100);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
    case 'mod':
      if (operands[0] === undefined) operands[0] = Number(str);
      else result();
      oper = c;
      newOperand = true;
      break;
    case '=':
      if (operands[0] != undefined) result();
      operands = [];
      newOperand = true;
      break;
    case 'pi':
      str = String(Math.PI).substring(0, 12);
      newOperand = true;
      break;
    case 'abs':
      str = Math.abs(Number(str));
      newOperand = true;
      break;
    case 'rev':
      str = String(1 / Number(str)).substring(0, 12);
      newOperand = true;
      break;
    case 'sqrt':
      str = String(Math.sqrt(Number(str))).substring(0, 12);
      newOperand = true;
      break;
    case 'sqr':
      str = String(Math.pow(Number(str), 2)).substring(0, 12);
      newOperand = true;
      break;
    case 'cube':
      str = String(Math.pow(Number(str), 3)).substring(0, 12);
      newOperand = true;
      break;
    case 'fact':
      str = String(factorial(Number(str))).substring(0, 12);
      console.log(str);
      newOperand = true;
      break;
    case 'ln':
      str = String(Math.log(Number(str))).substring(0, 12);
      newOperand = true;
      break;
    case 'log':
      str = String(Math.log(Number(str)) / Math.log(10)).substring(0, 12);
      break;
      newOperand = true;
    default:
      ch = c;
      if (newOperand) {
        newOperand = false;
        str = ch;
      } else {
        str =  (str[0] === '0' ? str.slice(1) : str) + (ch === '.' ? (str.indexOf(c) >= 0 ? '' : '.') : ch);
      }
    }
    if (str.length > 12) str = str.substring(0, 12);
  
    if (str.length > 12) str = str.substring(0, 12);
    tablo.textContent = str === 'NaN' ? 'Error' : str;
}


switcher.addEventListener('click', switchIt);
extend.addEventListener('click', shift);
document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', btnPressed));
window.addEventListener('keydown', keyPressed);
/*initialize();*/
