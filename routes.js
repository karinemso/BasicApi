const express = require('express');
const UserController = require('./controllers/UserController');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

let db = new sqlite3.Database('db.sqlite');

const userController = new UserController();

router.get('/users', userController.getUsers)

router.get('/users/:id', (req, res) => {

    const id = req.params.id
    const response = db.all(`SELECT * FROM users WHERE id = ${id}`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    })

})

router.post('/users', (req, res) => {
    const { name, email } = req.body
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function (err) {
        if (err) {
            res.status(400).send(err.message)
            return console.error(err.message);
        }
        res.status(200).send("Usuário cadastrado!")

    });

})

router.put('/users/:id', (req, res) => {
    const id = req.params.id
    const { name, email } = req.body

    if (!name || !email) {
        res.status(400).send("é necessário enviar os dois parâmetros")
    }
    db.run(`UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}`, function (err) {
        if (err) {
            res.status(400).send(err.message)
            return console.error(err.message);
        }
        res.status(200).send("Usuário atualizado!")

    });

})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id

    db.run(`DELETE from users WHERE id = '${id}'`, function (err) {
        if (err) {
            res.status(400).send(err.message)
            return console.error(err.message);
        }
        res.status(200).send("Usuário deletado!")

    });

})
module.exports = router