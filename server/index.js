const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;
// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// test books
app.get("/api", (req, res) => {
  res.json({ "books": ["book 1", "book 2", "book 3"] })
})

// home page
app.get('/', (req, res) => {
  res.send('Hi There')
});

// get all of the books in the database
app.get('/get', (req, res) => {
  res.send('the response from the get call')
})

// add a book to the database
app.post("/insert", (req, res) => {
  res.send('post')
})

// delete a book from the database
app.delete("/delete/:bookId", (req, res) => {
  res.send('delete')
})

// update a book review
app.put("/update/:bookId", (req, res) => {
  res.send('put')
})

app.listen(port, () => {console.log("Server listening on", port)})