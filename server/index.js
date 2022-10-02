const express = require('express');
const cors = require('cors');
const app = express();

const booksController = require('./controllers/booksController')

const port = process.env.PORT || 3001;
// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hi There')
});

// MyBooks page routes
app.post('/MyBooks/AddNewBook', async (req, res) => {
    booksController.AddNewBook(req, res);
})
app.get('/MyBooks', async (req, res) => {
  booksController.getUserBooks(req, res);
})
app.post('/MyBooks/UpdateTitle', async (req, res) => {
  booksController.updateTitle(req, res);
})
app.post('/MyBooks/DeleteBook', async (req, res) => {
  booksController.deleteBook(req, res);
})

app.listen(port, () => { })