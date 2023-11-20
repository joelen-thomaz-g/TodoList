import mysql from "mysql2";

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'todolist'
}).promise()

async function connection() {
    await pool.connect((err)=>{
        if (err) {
            throw err;
        }
        console.log('MySQL Connect...');
    })
    pool.destroy();
}
export {connection,pool}