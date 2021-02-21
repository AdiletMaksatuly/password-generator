const result = document.querySelector('#result');
const length = document.querySelector('#length');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const generate = document.querySelector('#generate');
const clipboard = document.querySelector('#clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generate.addEventListener('click', () => {
  const passLength = +length.value;
  const hasLower = lowercase.checked;
  const hasUpper = uppercase.checked;
  const hasNumber = numbers.checked;
  const hasSymbol = symbols.checked;

  result.textContent = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    passLength
  );
});

clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = result.textContent;

  if (!password) return;

  textarea.value = password;
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert('Password copied to clipboard!');
})

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (!typesCount) return '';

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const func = Object.keys(type)[0];

      generatedPassword += randomFunc[func]();
    });
  }

  return generatedPassword.slice(0, length);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
