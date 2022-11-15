const {Task} = require("./task");

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

class TaskManager {
    constructor(parser, taskStore) {
        this.parser = parser;
        this.store = taskStore;
    }

    handleCommand(command) {
        const parsedCommand = this.parser.parse(command);
        switch (parsedCommand[0]) {
            case '+':
                this.addTask(parsedCommand[1])
                break;
        }
    }

    addTask(description){
        this.store.addTask(new Task(description))
    }
}

module.exports = { Parser, TaskManager }