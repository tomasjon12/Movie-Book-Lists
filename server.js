console.log("Hello");

const express = require("express");
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const dburl = "mongodb+srv://User:d!!x*47LjevL8s*@cluster0.bptik.mongodb.net/MovieBookLists?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(dburl, { useUnifiedTopology: true }).then(client => {
    console.log('Connected to Database')

    const db = client.db('movie-book-lists')
    const moviesCollection = db.collection('movies')
    const booksCollection = db.collection('books')

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    app.get('/', (req, res) => {res.sendFile(__dirname + '/index.html')})


    // AFTER FETCH IN MAIN.JS THE PAGE DOESNT RE UPDATE
    app.get('/movielist', (req, res) => {
        db.collection('movies').find().toArray().then(results => {console.log(results)
                                                                  res.render('index.ejs', { movies: results })})
                                                .catch(error => console.error(error))
    })
    //app.get('/booklist', (req, res) => {
    //    db.collection('books').find().toArray().then(results => {console.log(results)
    //                                                             res.render('index.ejs', { movies: results })})
    //                                            .catch(error => console.error(error)) })

    app.post('/Movies', (req, res) => {
        moviesCollection.insertOne(req.body).then(result => {res.redirect('/')})
                                            .catch(err => console.error(err))
    })
    app.post('/Books', (req, res) => {
        booksCollection.insertOne(req.body).then(result => {res.redirect('/')})
                                            .catch(err => console.error(err))
    })


}) .catch(error => console.error(error))






app.listen(3000, function() {
    console.log('listening on 3000')
})
