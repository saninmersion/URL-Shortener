var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
var base = alphabet.length

//function to convert base 10 integer to base 58
function encode(num){
    var encoded = ''
    while(num){
        var remainder = num % base
        num = Math.floor(num/base)
        encoded = alphabet[remainder].toString() + encoded
    }
    return encoded
}

//function to convert base 58 to base 10
function decode(str){
    var decoded = 0
    while(str){
        var index = alphabet.indexOf(str[0])
        var power = str.length - 1
        decoded   += index*(Math.pow(base, power))
        str = str.substring(1)
    }
    return decoded
}

// export functions
module.exports.encode = encode;
module.exports.decode = decode;
