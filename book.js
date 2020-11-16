const data = require('data-store')( {path: process.cwd() + '/data/book.json'})


class Book {

    constructor(id, title, price, authors) {
        this.id = id
        this.title = title
        this.price = price
        this.authors = authors
    }

    update () {
        data.set(this.id.toString(), this)
    }

    delete() {
        data.del(this.id.toString())
    }

}

Book.getAllIDs = () => {
    return Object.keys(data.data).map((id => {return parseInt(id)}))
}

Book.getBookByID = (id) => {
    let bookData = data.get(id)
    if (bookData == null) {
        return null
    }
    return new Book(bookData.id, bookData.title,
        bookData.price, bookData.authors)
}

Book.next_id = Book.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id
    }
    return max
}, - 1) + 1

Book.create = (title, price, authors) => {
    let id = Book.next_id
    Book.next_id += 1
    let b = new Book (id, title, price, authors)
    data.set(b.id.toString(), b)
    return b
}



let b1 = new Book(0, "first book", 10, "henry")
data.set(b1.id.toString(), b1)
console.log(b1.id)


module.exports = Book;