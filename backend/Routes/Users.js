const mysql = require('mysql2');
const express = require('express');
const jwt = require('jsonwebtoken');

// ENV variables
require('dotenv').config();

const router = express.Router();



// Connect To DB
const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DBDATABASE
})

con.connect(function(err){
    if(err) throw err;
    console.log('connected!');
});
// end

// Select or Create the Users table
function selectOrCreateTable(){
    con.query('SELECT * FROM users', function(err, result, fields){
        if(err){
            const sql = 'CREATE TABLE users (id INT Auto_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), pic VARCHAR(255), email VARCHAR(255) NOT NULL UNIQUE, adress VARCHAR(255))';
            con.query(sql, function(err, result){
                if(err) throw err;
            });
        }
    });
}

selectOrCreateTable();

// Create new user
router.post('/Register', async (req, res) => {
    const email = req.body.Data.email;
    const pass = req.body.Data.password;
    const name = req.body.Data.name;

    con.query(`SELECT * FROM users WHERE email = '${email}'`, function(err, result){
        if(err){
            res.send({ err: 'err' })
        }
        if(result.length === 0){
            var sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${pass}')`;
            con.query(sql, function(err, result){
                if(err) { throw err; }
                res.status(200).send({ result })
                console.log(result)
            })
        } else {
            return res.status(201).send({ message: 'this email is already taken before' });
        }
    })
})

const jwtPrivateSecret = 'Ahmed#ReactNodeCourse';

// login in
router.post('/Login', async (req, res) => {
    //console.log(req.body)
    const email = req.body.Data.email;
    const pass = req.body.Data.password;
    //console.log('email: ', email, 'pass: ', pass)

    con.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${pass}'`, 
    async function(err, result){
        //console.log(result)
        if(result.length !== 0){
            jwt.sign({ UserEmail: email }, jwtPrivateSecret,
                (err, token) => {
                    res.status(200).send({ token:token });
                })
        }
        if(result.length === 0){
            res.status(400).send({ message: 'Error: Not Found' });
        }
    })
})

module.exports = router;

