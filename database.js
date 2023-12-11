import mysql from "mysql2"
import expressAsyncHandler from 'express-async-handler'
import dotenv from "dotenv";
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();



export async function run() {
    let connection;

    try {
        connection = await pool.getConnection();

        console.log('Connected to MySQL server');

    } catch (err) {
        console.error('Error getting connection from pool:', err);
    } finally {
        if (connection) {
        
            connection.release();
        }
    }
}

function asyncHandler(fn) {
    return async (req,res,next) => {
        try {
            await fn(req,res,next);
        } catch (err) {
            next(err)
        }
    }
}
// export async function createUser() {
    
// }

const createUser = expressAsyncHandler(async (req,res,next) => {
    try {
        const { firstname, lastname, age, dateofbirth,salary } = req.body;
    const result = await pool.query('INSERT INTO employees(firstname,lastname,age,dateofbirth,salary) VALUES (?,?,?,?,?)', [firstname, lastname, age, dateofbirth,salary]);

    res.status(201)
    // console.log({result})
    return res.status(201).json({
        data:result
    })
        
    } catch (error) {
        console.log(error);
        
    }
    

    

})

const updateUser = expressAsyncHandler(async (req,res,next) => {
    
})

const getAllUsers = expressAsyncHandler(async (req, res,next) => {
    const [rows] = await pool.query("SELECT * FROM employees");
    console.log(rows);

    return res.status(200).json({
        data: rows
    })

})

const getSingleUser = expressAsyncHandler(async (req,res,next) => {
    // const { id } = req.id;
    const { id } = req.params;
    const statusCode = res.statusCode || 200;
    const result = await pool.query('SELECT * FROM employees WHERE id=?', [id]);
    console.log(result);
    return res.status(statusCode).json({
        data:result
    })
})

export {
    createUser,
    updateUser,
    getAllUsers,
    getSingleUser
}