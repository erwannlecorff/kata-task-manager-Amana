const {Task} = require("./task");

class TaskManager {
    constructor(taskStore) {
        this.store = taskStore;
    }

    handleCommand(command, argument) {
        switch (command.toLowerCase()) {
            case '+':
                this.addTask(argument)
                break;
            case '-':
                this.deleteTask(argument)
                break;
            case 'x':
                this.markTaskAsDone(argument)
                break;
            case 'o':
                this.markTaskAsNotDone(argument)
                break;
        }
    }

    addTask(description){
        this.store.addTask(new Task(description))
    }

    convertHumanIndexToMachineIndex(idString){
        return Number.parseInt(idString) - 1;
    }

    deleteTask(idString){
        this.store.deleteTask(this.convertHumanIndexToMachineIndex(idString));
    }

    markTaskAsDone(idString) {
        this.store.changeTaskDoneStatus(this.convertHumanIndexToMachineIndex(idString), true)
    }

    markTaskAsNotDone(idString) {
        this.store.changeTaskDoneStatus(this.convertHumanIndexToMachineIndex(idString), false)
    }
}

module.exports = { TaskManager }