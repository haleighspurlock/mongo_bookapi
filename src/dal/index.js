import mongoose, { Schema } from 'mongoose';
mongoose.set('strictQuery', false)

const Book = new Schema({
    id: { type: Number, index: true },
    title: { type: String, require: true },
    author: { type: String },
    description: { type: String },
    year: { type: Number, min: 4 },
  });

let books = ([
    {id: 1, title: "All the Dangerous Things", discription: "x", year: 2023}, 
    {id: 2, title: "The Book of Cold Cases", discription: "x", year: 2023}, 
    {id: 3, title: "The Collective", discription: "x", year: 2023}, 
    {id: 4, title: "Dark Matter", discription: "x", year: 2023}])

    let currentID = 5

    let conn = null
    export const init = async () => {
        conn = await mongoose.connect('mongodb://127.0.0.1:27017/bookapi')
        console.log('connected to db!')
        const bookModel = conn.model('Book', Book)
        const books = await bookModel.find()
        console.log(books[0].title) 
    }

    export const addBook = (book) => {
        books.push({id: currentID, ...book})
        currentID++
    }

    export const updateBook = (id, data) => {
        var foundIndex = books.findIndex(book => book.id == id)
        if (foundIndex > -1) {
            books[foundIndex] = {...books[foundIndex], ...data}
        } else {
            throw new Error ("Book not Found")
        }
    }

    export const deleteBook = (id) => {
        var foundIndex = books.findIndex(book => book.id == id)
        if (foundIndex > -1 ) {
          books.splice(foundIndex, 1)
        } else {
            throw new Error("Book not Found")
        }
    }

    export const listBooks = () => {
        return books
    }

    export const getBook = (id) => {
        var foundIndex = books.findIndex(book => book.id == id)
        if (foundIndex > -1) {
            return books.id
        } else {
            throw new Error("Book not Found")
        }
    }