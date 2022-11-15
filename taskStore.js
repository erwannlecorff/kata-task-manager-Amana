class TaskStore {
    taskList = []

    addTask(newTask){
        this.taskList.push(newTask)
    }
}

module.exports = { TaskStore }