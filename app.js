const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const logger = require('./middleware/logger');
const customers = require('./Customers');

const app = new express();

// app.use(logger);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Express Customer',
        customers
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/customers', require('./routes/api/customers'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
