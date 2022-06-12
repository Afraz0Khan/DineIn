const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const users = require('./routes/users');
const seller = require('./routes/seller');
const bodyParser = require('body-parser');
const app = express();

const db = require('./config/keys').mongoURI;

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

app.use('/api/seller', seller)





app.listen(PORT , () => {
    console.log(`Server succesfully on port ${PORT}`)
})