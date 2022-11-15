const test = require('tape')
const { TaskStore } = require('../taskStore')

test("Store should keep track of new tasks", (t) => {
    const newTask = "Do the dishes";
    const taskStore = new TaskStore();

    taskStore.addTask(newTask);

    t.ok(taskStore.taskList.includes(newTask), "The task list should contain the provided task")
    t.end()
})

test("Store should provide its internal list of tasks", (t) => {
    const listOfTasks = ['A a', 'B b', 'C c']
    const taskStore = new TaskStore(listOfTasks);

    t.deepEqual(taskStore.getTasks(), listOfTasks)
    t.notEquals(taskStore.getTasks(), listOfTasks, "The TaskStore should provide a copy of its internal list (and not the actual reference to the list)")
    t.end()
})