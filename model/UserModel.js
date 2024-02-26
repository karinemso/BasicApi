

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db.sqlite');


class User {

    getAllUsers = (req,res) => {
        db.all("SELECT * FROM users", (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        })
    }

}


module.exports = User