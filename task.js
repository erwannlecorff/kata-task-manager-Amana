class Task {
    constructor(description, done = false) {
        this.description = description
        this.done = done
    }
}

module.exports = { Task }