const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

// Creamos la base de datos de prueba
const create_db = 'CREATE DATABASE prueba'

pgclient.end();

// Creamos la tabla
const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'


const pgclient1 = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'prueba'
});

pgclient1.connect();
// Primer insert
const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values = ['Ingrid', 'Chávez', 18, 'Reforms 222. Cuauhtémoc, CDMX, México', 'ingrid@github.com']

pgclient1.query(table, (err, res) => {
    if (err) throw err
});

pgclient1.query(text, values, (err, res) => {
    if (err) throw err
});


// Segundo insert
const text1 = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values1 = ['Roberto', 'Andrade', 58, 'Chopo 8, Cuauhtémoc, CDMX, México', 'raf@github.com']


pgclient1.query(text1, values1, (err, res) => {
    if (err) throw err
});

pgclient1.query('SELECT * FROM student', (err, res) => {
    if (err) throw err
    console.log(err, res.rows) // Print the data in student table
    pgclient1.end()
});
