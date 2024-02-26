
const express = require('express')
const bodyParser = require('body-parser');
const router = require('./routes');
const auth = require('./middleware/transformMiddleware');


const app = express()

app.use(bodyParser.json())

app.use(auth)
app.use(router)

app.listen(3000, () => {
    console.log("Servidor escutando em http://localhost:3000")
})


