require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const path = require('path')

const port = 3000
const app = express()

app.use(express.static(path.resolve('..', 'client', 'dist')))

app.use(cookieParser())
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', routes)

app.all('/{*any}', (req, res, next) => {
    res.sendFile(path.resolve("..", "client", "dist", "index.html"))
})

mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
    app.listen(port, async () => {
        console.log(`server started on port ${port}`)
    })
})