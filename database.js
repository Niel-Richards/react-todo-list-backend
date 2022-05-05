const sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('./tasks.db');

function selectAllTasks() {
    return new Promise((res, rej) => {
        db.all("SELECT * FROM tasks_tbl ORDER BY ID DESC",(err,row) => {
            err ? rej(err):res(row);
        });
    });
    
}

function createTask(taskDesc) {
    const createQuery = `INSERT INTO tasks_tbl(description) VALUES(?)`;
    return new Promise((res, rej) => {
        db.run(createQuery, taskDesc[0].description,function (err) {
            // console.warn("Inserted id:", this);
            err ? rej(err):res(this.lastID);
        });
    });

}
function deleteTask(task_id) {
    const deleteQuery = `DELETE FROM tasks_tbl where id=?`;
    return new Promise((res, rej) => {
        db.run(deleteQuery, task_id, function (err) {
            err ? rej(err):res(this);
        });
    });

}

function selectTask(task_id) {
    const selectQuery = `SELECT * FROM tasks_tbl where id=?`;
    return new Promise((res, rej) => {
        db.get(selectQuery, task_id,(err,row) => {
            err ? rej(err):res(row);
        });
    });

}

function updateTask(task_id, task) {
    //this has a bug. only the number of rows affected will be returned and no data.
    return new Promise((res, rej) => {
        db.run("UPDATE tasks_tbl SET description =?, isComplete = ? WHERE id = ?", [task[0].description, task[0].isComplete, task_id], function (err) {
            err ? rej(err):res(this);
        });
    });

}

module.exports = {selectTask, createTask, updateTask, selectAllTasks, deleteTask};

//TODO make this a DRY implementation!