const mysql = require('mysql2');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// ENV variables
require('dotenv').config();

const router = express.Router();

// Connect To DB
const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DBDATABASE,
    connectionLimit:50,
    queueLimit:50,
    waitForConnections:true
})

con.connect(function(err){
    if(err) throw err;
});

con.on('error', () => console.log('error'));

// this function is for server crashing errors. 

/* var del = con._Protocol_delegateError;
con._Protocol._delegateError = function(err, sequence) {
    if(err.fatal){
        console.trace('fatal err: ' + err.message);
    }
    return del.call(this, err, sequence);
} */

// this func allow users to visit this path
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'react')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'react', 'index.html'));
// })
// end

// code for image upload / some settings...
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime Type')
        if(isValid) { error = null; }
        cb(error, 'images');
    }, filename: (req, file, cb) =>{
        const name = file.originalname
        .toLowerCase()
        .split(' ')
        .join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext )
    }
})

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

// get user data
router.get('/GetUserData', async (req, res) => {
    const Token = req.headers['authorization'];
    var decoded = jwt.decode(Token, { complete:true });
    const UserE = decoded.payload.UserEmail;

    const SQL = `SELECT * FROM users WHERE email='${UserE}'`;

    con.query(SQL, function(err, result){
        if(err) throw err;
        res.status(200).send({ result });
    })
})

// update user data name pic address

const upload = multer({
    storage:storage, limits:{ fieldSize:12*1024*1024 }
}).single('image');

router.put('/edit/:id', upload, (req, res, next ) => {
    if(req.file && req.file !== ''){
        const Id = req.params.id;
        const URL = req.protocol+'://'+req.get('host');
        const pic = URL + '/images/' + req.file.filename;

        const name = req.body.name;
        const adress = req.body.adress;
        // update with mysql
        const SQL = `UPDATE users SET name = '${name}', adress = '${adress}', pic = '${pic}' WHERE id=${Id}`;
        con.query(SQL, function(err, result){
            if(err) throw err;
            res.status(200).send({message:'successfully', result })
        })
    } else {
        const Id = req.params.id;
        const name = req.body.name;
        const adress = req.body.adress;

        //update with mysql
        const SQL = `UPDATE users SET name = '${name}', adress = '${adress}' WHERE id=${Id}`;
        con.query(SQL, function(err, result){
            if(err) throw err;
            res.status(200).send({message:'Updated', result })
        })
    }
})

// delete one user
router.delete('/delete/:id/:password', (req, res, next) => {
    const Id = req.params.id;
    const pass = req.params.password;

    con.query(`SELECT * FROM users WHERE id='${Id}' AND password='${pass}'`, 
    async function(err, result){
        if(result.length !== 0){
            //pass correct
            con.query(`DELETE FROM users WHERE id='${Id}'`, 
            async function(err, result){
                if(err) throw err;
                res.status(200).send({ message: result })
            })
        }
        if(result.length === 0){
            res.status(400).send({ message: 'Error the password is not correct'})
        }
    })
})

module.exports = router;

