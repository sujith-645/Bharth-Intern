const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/user_registration', { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error registering user');
        } else {
            res.send('User registered successfully');
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});