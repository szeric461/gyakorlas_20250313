const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'felveteli',
    port: 3307 
});

app.get('/rangsor', (req, res) => {
    const query = `
        SELECT d.nev, t.agazat, (d.hozott + d.kpmagy + d.kpmat) AS osszpont
        FROM diakok d
        JOIN jelentkezesek j ON d.oktazon = j.diak
        JOIN tagozatok t ON j.tag = t.akod
        ORDER BY d.nev ASC;
    `;
    connection.query(query, (err, result) => {
        if (err) {
            return res.json(err);
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Szerver a ${port}-es porton fut`);
});