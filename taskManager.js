class Parser {

    /**
     * Splits a string between the command symbol and the rest of the text
     *
     * The command symbol is defined as the first "word" of the string
     * @param text
     * @returns [commandSymbol, restOfMessage]
     */
    parse(text){
        const splitText = text.split(' ')
        return [splitText.shift(), splitText.join(' ')];
    }


}

module.exports = { Parser }