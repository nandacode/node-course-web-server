const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append text to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//    res.render('maintenance'); 
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('Hello Express!');
    // res.send({
    //     name: 'Nanda',
    //     likes:[
    //         'music',
    //         'coding'
    //     ]
    // })
    res.render('home', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to our website'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About page</h1>');
    res.render('about', {
        pageTitle: 'About page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'My projects list'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to process request'
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});