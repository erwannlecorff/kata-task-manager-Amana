const {TaskStore} = require("./taskStore");
const prompt = require('prompt-sync')()

class ConsoleInteractor {
    readInput () {
        return prompt('')
    }

    printMessage (message) {
        console.log(message)
    }
}

class UI {
    constructor(consoleInteractor = new ConsoleInteractor(), taskStore = new TaskStore()) {
        this.consoleInteractor = consoleInteractor;
        this.taskStore = taskStore;
    }

    printTaskList(){
        this.taskStore.getTasks().forEach((task, index) => {
            this.consoleInteractor.printMessage(`${index+1}. [${task.done ? 'x' : ' '}] ${task.description}`)
        })
    }
}

module.exports = { UI }