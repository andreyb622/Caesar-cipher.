const errorHandle = require("./errorHandle")

const dataHandle = (data, shift) => {
  const alphabet = 26

  if((shift % alphabet) === 0) {
    return data
  };

  if(shift < 0) {
      shift += alphabet;
  };

  let resultStr = []

  for(let i = 0; i < data.length; i++) {
    let symbol = data[i]
    if(symbol.match(/[a-z]/i)) {
        const charCode = data.charCodeAt(i)
        if (charCode >= 65 && charCode <= 90) {
            symbol = String.fromCharCode(((charCode - 65 + shift) % alphabet) + 65)
        } else if (charCode >= 97 && charCode <= 122) {
            symbol = String.fromCharCode(((charCode - 97 + shift) % alphabet) + 97)
        }
    }
    resultStr += symbol
  }
  return resultStr
}

const caesarCipher = (data, shift, action) => {
  if(action === 'encode') {
    return dataHandle(data, shift)
  } else if(action === 'decode') {
    return dataHandle(data, -shift)
  } else {
    return errorHandle('action undefined')
  }
}

module.exports = { caesarCipher }