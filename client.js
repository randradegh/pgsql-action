const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'test'
});

pgclient.connect();

// Creamos la tabla
const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'

pgclient.query(table, (err, res) => {
    if (err) throw err
});

// Primer insert
const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values = ['Ingrid', 'Chávez', 18, 'Reforma 222. Cuauhtémoc, CDMX, México', 'ingrid@github.com']

pgclient.query(text, values, (err, res) => {
    if (err) throw err
});


// Segundo insert
const text1 = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values1 = ['Roberto', 'Andrade', 58, 'Chopo 8, Cuauhtémoc, CDMX, México', 'raf@github.com']


pgclient.query(text1, values1, (err, res) => {
    if (err) throw err
});

pgclient.query('SELECT * FROM student', (err, res) => {
    if (err) throw err
    console.log(err, res.rows) // Print the data in student table
    pgclient.end()
});