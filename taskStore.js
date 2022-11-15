class TaskStore {
    constructor(taskList = []) {
        this.taskList = taskList.map((x) => x)
    }

    addTask(newTask){
        this.taskList.push(newTask)
    }

    getTasks(){
        return this.taskList.map((x) => x);
    }

    deleteTask(id){
        this.taskList.splice(id, 1);
    }
}

module.exports = { TaskStore }