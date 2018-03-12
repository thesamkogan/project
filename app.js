const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const { db, Page, User } = require('./models');
const routes = require('./routes')

app.use(morgan('combined'));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates 

// app.use(express.static('views'));

app.use('/', routes);

app.get('/stylesheets/style.css', function (req, res, next) {
    res.sendFile('/stylesheets/style.css', {root: __dirname + '/views'});
});


app.get('/', (req, res) => res.render('index'))

// db.sync({force: true})
db.sync()
.then(()=> {
    console.log('All tables created!')
    app.listen(3000, () => console.log('server listening'))
}).catch(
    console.log.bind(console))
