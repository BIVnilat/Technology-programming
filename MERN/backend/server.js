const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const messageRoutes = express.Router();
const PORT = 4000;
let Message = require('./models/messages');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/laboratory', { useNewUrlParser: true });
const connection = mongoose.connection;

// Once the connection is established, callback
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

messageRoutes.route('/').get( (req,res) => {
    Message.find({}).sort({createdAt: 'desc'}).exec((err, message) => {
        if(err)
            console.log(err);
        else {
            res.json(message);
        }
    });
});

messageRoutes.route('/random').get( (req,res) => {
    res.send('hello '+getRandomInt(3));
});

messageRoutes.route('/print').post( (req,res) => {
    console.log(req.body.message);
});

messageRoutes.route('/add').post((req,res) => {
    const message = new Message(req.body);
    message.save()
        .then( data => {
            Message.find({}).sort({createdAt: 'desc'}).exec((err, messages) => {
                if(err)
                    console.log(err);
                else {
                    console.log(messages);
                    res.status(200).json(messages);
                }
            });
        })
        .catch( err => {
            res.status(400).send('adding new messages failed');
        });
});

messageRoutes.route('/remove/:id').delete((req,res) => {
    Message.findByIdAndDelete({_id: req.params.id}, (err, message) => {
        if(err) {
            console.log(err);
        } else {
            Message.find({}).sort({createdAt: 'desc'}).exec((err, messages) => {
                if(err)
                    console.log(err);
                else {
                    res.status(200).json(messages);
                }
            });
        }
    });
});

messageRoutes.route('/update/:id').put((req,res) => {
    Message.findById(req.params.id, (err, messages) => {
        if(!messages)
            res.status(404).send('Data is not found');
        else {
            messages.value = req.body.value;
            messages.save().then( messages => {
                Message.find({}).sort({createdAt: 'desc'}).exec((err, messages) => {
                    if(err)
                        console.log(err);
                    else {
                        res.status(200).json(messages);
                    }
                });
            })
            .catch( err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

app.use('/messages', messageRoutes);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});
