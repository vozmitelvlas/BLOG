require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const cors = require('cors')

const port = 3000
const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

app.use('/', routes)
mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
    app.listen(port, async () => {
        console.log(`server started on port ${port}`)
    })
})