import {db} from './firebase_config'

const Books = db.collection("books");
module.exports = Books;


