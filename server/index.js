const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const users = require('./routes/users');
const seller = require('./routes/seller');
const customer = require('./routes/customer');
const bodyParser = require('body-parser');
const app = express();

const db = require('./config/key').mongoURI;

app.use(cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
);


const PORT = 3000 || process.argv.PORT

mongoose.connect(
    db,
).then(
    () => {
        console.log('MongoDB Connected')
    }
).catch(
    err => {
        console.log(err)
    }
)

app.use('/api/users', users);

app.use('/api/seller', seller);

app.use('/api/customer', customer);


app.listen(PORT , () => {
    console.log(`Server succesfully on port ${PORT}`)
})