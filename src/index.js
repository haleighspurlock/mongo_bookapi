import express from 'express'
import bodyParser from 'body-parser'
import { init, addBook, deleteBook, getBook, updateBook } from './dal/index.js';
const app = express()
app.use(bodyParser.urlencoded(({ extended: true })));
app.use(bodyParser.json());
const port = 3000

app.get('/', async (req, res) => {
  await init()
  res.send('hello')
})

// returns array with all books
//example: [All the Dangerous Things, The Book of Cold Cases, The Collective, Dark Matter]
app.get('/books', (req, res) => {
  res.statusCode=200
  res.send(books)
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  try {
    getBook(id)
    res.send({
      "status_code": 200,
      "status_message": "Success."
    })
  } catch (err) {
    res.send({
      "status_code": 404,
      "status_message": err.message
    })
  }
})

app.post('/books', (req, res) => {
  addBook(req.body)
  res.send({
    "status_code": 200,
    "status_message": "Success."
  })
})

app.put('/books/:id', (req, res) => {
  const id = req.params.id
  try {
    updateBook(id)

    res.send({
      "status_code": 200,
      "status_message": "Success."
    })
  } catch (err) {
    res.send({
      "status_code": 404,
      "status_message": err.message
    })
  }
})

app.delete('/books/:id', (req, res) => {
  const id = req.params.id
  try{
    deleteBook(id)
    res.send({
      "status_code": 200,
      "status_message": "Success."
    })
  } catch (err){
    res.send({
      "status_code": 404,
      "status_message": err.message
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})