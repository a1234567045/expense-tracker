const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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



app.get('/', (req, res) => {
  res.render('index')
})









app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})

