const test = require('tape')
const { TaskManager } = require('../taskManager')

class SpyTaskStore {
    addTaskCalledWith = [];
    addTaskCalledTimes = 0;
    addTask(task){
        this.addTaskCalledWith.push(task);
        this.addTaskCalledTimes++;
    }

    deleteTaskCalledWith = [];
    deleteTaskCalledTimes = 0;
    deleteTask(id){
        this.deleteTaskCalledWith.push(id);
        this.deleteTaskCalledTimes++;
    }

    changeTaskDoneStatusCalledWith = [];
    changeTaskDoneStatusCalledTimes = 0;
    changeTaskDoneStatus(id, status){
        this.changeTaskDoneStatusCalledWith.push({
            id,
            status
        })
        this.changeTaskDoneStatusCalledTimes++;
    }
}

test("TaskManager.addTask should add a task to the store", (t) => {
    const description = "Lorem ipsum dolor sit amet";
    const spyStore = new SpyTaskStore();

    const taskManager = new TaskManager(spyStore);
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
    const spyStore = new SpyTaskStore();
    const taskManager = new TaskManager(spyStore);

    taskManager.handleCommand('+', 'A a');

    t.equal(spyStore.addTaskCalledTimes, 1);
    try {
        t.equal(spyStore.addTaskCalledWith[0].description, 'A a');
        t.equal(spyStore.addTaskCalledWith[0].done, false);
    } catch (e) {
        t.fail(e);
    }
    t.end();
})

test("TaskManager.deleteTask should call the store with the right id", (t) => {
    const spyStore = new SpyTaskStore();

    const taskManager = new TaskManager(spyStore);
    taskManager.deleteTask('1')

    t.equal(spyStore.deleteTaskCalledTimes, 1);
    t.equal(spyStore.deleteTaskCalledWith[0], 0, "TaskManager should translate human-based indexing to machine-indexing");
    t.end();
})

test("TaskManager should be able to remove a task from a command", (t) => {
    const spyStore = new SpyTaskStore();
    const taskManager = new TaskManager(spyStore);

    taskManager.handleCommand('-', '1');

    t.equal(spyStore.deleteTaskCalledTimes, 1);
    t.equal(spyStore.deleteTaskCalledWith[0], 0, "TaskManager should translate human-based indexing to machine-indexing");
    t.end();
})

test("TaskManager.markTaskAsDone should call the store with the right id and status", (t) => {
    const spyStore = new SpyTaskStore();
    const taskManager = new TaskManager(spyStore);

    taskManager.markTaskAsDone('1')

    t.equal(spyStore.changeTaskDoneStatusCalledTimes, 1);
    t.deepEqual(spyStore.changeTaskDoneStatusCalledWith[0], {id: 0, status: true}, "TaskManager should translate human-based indexing to machine-indexing");
    t.end();
})

test("TaskManager should be able to set a task as done from a command", (t) => {
    const spyStore = new SpyTaskStore();
    const taskManager = new TaskManager(spyStore);

    taskManager.handleCommand('x', '1');

    t.equal(spyStore.changeTaskDoneStatusCalledTimes, 1);
    t.deepEqual(spyStore.changeTaskDoneStatusCalledWith[0], {id: 0, status: true}, "TaskManager should translate human-based indexing to machine-indexing, and give the right status");
    t.end();
})

test("TaskManager.markTaskAsNotDone should call the store with the right id and status", (t) => {
    const spyStore = new SpyTaskStore();
    const taskManager = new TaskManager(spyStore);

    taskManager.markTaskAsNotDone('1')

    t.equal(spyStore.changeTaskDoneStatusCalledTimes, 1);
    t.deepEqual(spyStore.changeTaskDoneStatusCalledWith[0], {id: 0, status: false}, "TaskManager should translate human-based indexing to machine-indexing");
    t.end();
})

test("TaskManager should be able to set a task as not done from a command", (t) => {
    const spyStore = new SpyTaskStore();
    const taskManager = new TaskManager(spyStore);

    taskManager.handleCommand('o', '1');

    t.equal(spyStore.changeTaskDoneStatusCalledTimes, 1);
    t.deepEqual(spyStore.changeTaskDoneStatusCalledWith[0], {id: 0, status: false}, "TaskManager should translate human-based indexing to machine-indexing, and give the right status");
    t.end();
})

