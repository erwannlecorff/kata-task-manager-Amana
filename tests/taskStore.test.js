const test = require('tape')
const { TaskStore } = require('../taskStore')

test("Store should keep track of new tasks", (t) => {
    const newTask = "Do the dishes";
    const taskStore = new TaskStore();

    taskStore.addTask(newTask);

    t.ok(taskStore.taskList.includes(newTask), "The task list should contain the provided task")
    t.end()
})