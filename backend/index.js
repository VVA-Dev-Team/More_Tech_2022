require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const sequelize = require('./db')
const models = require('./models/models')
const helmet = require('helmet');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet({
      crossOriginResourcePolicy: false,
    }))
app.use(fileUpload({}))
app.use('/api', router)
app.use('/static', express.static('static'))


// всегда в конце (обработка ошибок)
app.use(errorHandler)


const start = async () => {
    try {

        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()