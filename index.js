const { json } = require("express");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())



const Book = require('./Book.js')


app.get('/book', (reg, res) => {
    res.json(Book.getAllIDs())
    return
})

app.get('/book/:id', (req, res) => {
    let b = Book.getBookByID(req.params.id)
    if (b == null) {
        res.status(404).send('book not found')
        reutrn
    }
    res.json(b)
})

app.post('/book', (req, res) => {
    let {title, price, authors} = req.body;


    let b = Book.create(title, price, authors)
    if (b == null) {
        res.status(400).send('bad request')
        return
    }
    return res.json(b)
})

app.put('/book/:id', (req, res) => {
    let b = Book.getBookByID(req.params.id)
    if (b == null) {
        res.status(404).send('book not found')
        return
    }
    let {title, price, authors} = req.body;
    b.title = title
    b.price = price
    b.authors = authors
    b.update()

    res.json(b)
})

app.delete('/book/:id', (req, res) => {
    let b = Book.getBookByID(req.params.id)
    if (b == null) {
        res.status(404).send('book not found')
        return
    }
    b.delete();
    res.json(true)
})




const port = 3030;
app.listen(port, () => {
    console.log("running")
})