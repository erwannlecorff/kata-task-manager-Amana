const test = require('tape')
const { TaskStore } = require('../taskStore')
const { Task } = require('../task')

test("Store should keep track of new tasks", (t) => {
    const newTask = new Task("Do the dishes");
    const taskStore = new TaskStore();

    taskStore.addTask(newTask);

    t.ok(taskStore.taskList.includes(newTask), "The task list should contain the provided task");
    t.end();
})

test("Store should provide its internal list of tasks", (t) => {
    const listOfTasks = [new Task('A a'), new Task('B b'), new Task('C c')]
    const taskStore = new TaskStore(listOfTasks);

    const taskStoreListOfTasks = taskStore.getTasks();

    t.deepEqual(taskStoreListOfTasks, listOfTasks);
    t.notEquals(taskStoreListOfTasks, listOfTasks, "The TaskStore should provide a copy of its internal list (and not the actual reference to the list)");
    t.end();
})

test("Store should delete a task given its id", (t) => {
    const listOfTasks = [new Task('A a'), new Task('B b'), new Task('C c')]
    const taskStore = new TaskStore(listOfTasks);
    const deletedId = 1;

    taskStore.deleteTask(deletedId);

    t.equal(taskStore.taskList.includes(listOfTasks[deletedId]), false, "Expect the task list to no longer contain the task after deleting");
    t.end();
})