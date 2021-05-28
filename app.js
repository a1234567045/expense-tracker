const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})



app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})


app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const reqbody = req.body
  return Record.findById(id)
    .then(record => {
      Object.assign(record, reqbody)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.post('/records', (req, res) => {
  const reqbody = req.body
  return Record.create(reqbody)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})













app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})

