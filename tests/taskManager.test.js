const test = require('tape')
const { Parser, TaskManager } = require('../taskManager')
const {Task} = require("../task");

class StubParser {
    constructor(returnValue) {
        this.returnValue = returnValue;
    }

    parse(text){
        return this.returnValue;
    }
}

class SpyTaskStore {
    addTaskCalledWith = [];
    addTaskCalledTimes = 0;

    addTask(task){
        this.addTaskCalledWith.push(task);
        this.addTaskCalledTimes++;
    }
}

test("Parser should extract the command symbol", (t) => {
    const text = "+ <description in several words>";
    const expected = ['+', '<description in several words>'];

    const parser = new Parser();

    t.deepEqual(parser.parse(text), expected);
    t.end();
})

test("TaskManager.addTask should add a task to the store", (t) => {
    const description = "Lorem ipsum dolor sit amet";
    const stubParser = new StubParser(undefined);
    const spyStore = new SpyTaskStore();

    const taskManager = new TaskManager(stubParser, spyStore);
    taskManager.addTask(description);

    t.equal(spyStore.addTaskCalledTimes, 1);
    try {
        t.equal(spyStore.addTaskCalledWith[0].description, description);
        t.equal(spyStore.addTaskCalledWith[0].done, false);
    } catch (e) {
        t.fail(e);
    }
    t.end();
})

test("TaskManager should be able to add a task from a command", (t) => {
    const command = "+ A a"
    const stubParser = new StubParser(['+', 'A a']);
    const spyStore = new SpyTaskStore();

    const taskManager = new TaskManager(stubParser, spyStore);

    taskManager.handleCommand(command);

    t.equal(spyStore.addTaskCalledTimes, 1);
    try {
        t.equal(spyStore.addTaskCalledWith[0].description, 'A a');
        t.equal(spyStore.addTaskCalledWith[0].done, false);
    } catch (e) {
        t.fail(e);
    }
    t.end();
})

