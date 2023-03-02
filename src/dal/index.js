import mongoose, { Schema } from 'mongoose';
mongoose.set('strictQuery', false)

const Book = new Schema({
    id: { type: Number, index: true },
    title: { type: String, require: true },
    author: { type: String },
    description: { type: String },
    year: { type: Number, min: 4 },
  });

    let conn = null
    export const init = async () => {
        conn = await mongoose.connect('mongodb://127.0.0.1:27017/bookapi')
        console.log('connected to db!')
    }

    export const addBook = async (book) => {
        const bookModel = conn.model('Book', Book)
        await bookModel.create(book)
    }

    export const updateBook = async (id, data) => {
        const bookModel = conn.model('Book', Book)
        await bookModel.updateOne({"_id" :id}, {...data})
    }

    export const deleteBook = async (id) => {
        const bookModel = conn.model('Book', Book)
        await bookModel.deleteOne({"_id" :id})
    }

    export const listBooks = async () => {
        const bookModel = conn.model('Book', Book)
        const books = await bookModel.find()
        return books
    }

    export const getBook = async (id) => {
        const bookModel = conn.model('Book', Book)
        const books = await bookModel.find({"_id" :id})
        return books
    }