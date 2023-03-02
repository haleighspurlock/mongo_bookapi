import express from 'express'
import bodyParser from 'body-parser'
import { init, addBook, deleteBook, getBook, updateBook, listBooks } from './dal/index.js';
const app = express()
app.use(bodyParser.urlencoded(({ extended: true })));
app.use(bodyParser.json());
const port = 3000

// returns array with all books
//example: [All the Dangerous Things, The Book of Cold Cases, The Collective, Dark Matter]
app.get('/books', async (req, res) => {
  const books = await listBooks()
  res.statusCode=200
  res.send(books)
})

app.get('/books/:id', async (req, res) => {
  const id = req.params.id
  try {
    const book = await getBook(id)
    res.send(book)
  } catch (err) {
    res.send({
      "status_code": 404,
      "status_message": err.message
    })
  }
})

app.post('/books', async (req, res) => {
  await addBook(req.body)
  res.send({
    "status_code": 200,
    "status_message": "Success."
  })
})

app.put('/books/:id', async (req, res) => {
 const id = req.params.id
  try {
    await updateBook(id)

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

app.delete('/books/:id', async (req, res) => {
  const id = req.params.id
  try{
    await deleteBook(id)
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

app.listen(port, async () => {
  await init()
  console.log(`Example app listening on port ${port}`)
})