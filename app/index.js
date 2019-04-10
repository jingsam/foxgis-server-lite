const path = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.disable('x-powered-by')
app.set('json spaces', 2)
app.set('trust proxy', true)

app.use(morgan('dev'))
app.use(cors())
app.use(compression())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/api', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next({ status: 404, message: 'URL错误，请检查URL是否正确。' })
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.code === 'ENOENT') return res.sendStatus(404)

  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err.stack && err.stack.split('\n')
  })
})

module.exports = app
