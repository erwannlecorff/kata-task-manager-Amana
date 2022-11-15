class TaskStore {
    constructor(taskList = []) {
        this.taskList = taskList
    }

    addTask(newTask){
        this.taskList.push(newTask)
    }

    getTasks(){
        return this.taskList.map((x) => x);
    }
}

module.exports = { TaskStore }