const test = require('tape')
const { UI } = require('../ui')
const {Task} = require("../task");

class SpyConsoleInteractor {
    consoleOutputs = []

    constructor(inputs = []){
        this.consoleInputQueue = inputs
    }

    readInput () {
        let input = this.consoleInputQueue.shift()
        return input ? input : 'q'
    }

    printMessage (message) {
        this.consoleOutputs.push(message)
    }
}

class StoreStub {
    constructor(taskList) {
        this.taskList = taskList
    }

    getTasks(){
        return this.taskList
    }
}

test("UI should print the TaskList properly", (t) => {
    const taskList = [new Task('A a'), new Task('B b', true), new Task('C c', true)];
    const expectedConsoleOutput = [
        "1. [ ] A a",
        "2. [x] B b",
        "3. [x] C c",
    ];
    const spyConsoleInteractor = new SpyConsoleInteractor();
    const storeStub = new StoreStub(taskList);
    const ui = new UI(spyConsoleInteractor, storeStub);

    ui.printTaskList();

    t.deepEqual(spyConsoleInteractor.consoleOutputs, expectedConsoleOutput);
    t.end();
})