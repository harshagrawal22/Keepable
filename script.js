
let wordsList = [];
let wordsLoaded = false;

function loadWordsChunk() {
  fetch('words.txt')
    .then(response => response.text())
    .then(data => {
      wordsList = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
      wordsLoaded = true;
    })
    .catch(error => console.error('Error loading words:', error));
}

loadWordsChunk();


function getRandomWord(hasupper,minLength, maxLength) {
  if (!wordsLoaded || wordsList.length === 0) return '';
  let filteredWords = wordsList.filter(word => word.length >= minLength && word.length <= maxLength);
  if (filteredWords.length === 0) return '';
  found=filteredWords[Math.floor(Math.random() * filteredWords.length)];
  if(hasupper==1){
    if(Math.random()>0.75){
      index=Math.floor(Math.random() * found.length);
      found = found.slice(0, index) + found[index].toUpperCase() + found.slice(index + 1);
    }
  }
  return found;
}


  function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  
  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  


  const randomFunc = {
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };
  

  const generate = document.getElementById("generateBtn");
  generate.addEventListener("click", () => {
    const length = document.getElementById("Passwordlength").value;
    const hasUpper = document.getElementById("uppercase").value;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    const result = document.getElementById("PasswordResult");
    result.innerText = generatePassword(
      hasUpper,
      hasNumber,
      hasSymbol,
      length
    );
  
  });
  

  function generatePassword( upper,number, symbol, length) {
      let generatedPassword = "";
      const typesCount =  number + symbol;
 
      const typesArr = [{ number }, { symbol }].filter(
        (item) => Object.values(item)[0]
      );

  
      for (let i = 0; i < length; i += 1) {
        minim=Math.floor(Math.random() * 2) + 3;
        generatedPassword+=getRandomWord(upper,minim,minim+3);
        typesArr.forEach((type) => {
          const funcName = Object.keys(type)[0];
          generatedPassword += randomFunc[funcName]();
        });
      }
      
      return generatedPassword;
    }
    

  let button = document.getElementById("clipboardBtn");

  button.addEventListener("click", (e) => {
    e.preventDefault();

    document.execCommand(
      "copy",
      false,
      document.getElementById("PasswordResult").select()
    );
  });
  